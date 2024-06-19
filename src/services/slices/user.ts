import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

interface UserState {
  iaAuthCheck: boolean;
  data: TUser | null;
  requestStatus: RequestStatus;
}

const initialState: UserState = {
  iaAuthCheck: false,
  data: null,
  requestStatus: RequestStatus.Idle
};

export const userRerister = createAsyncThunk(
  'user/register',
  async (user: TRegisterData) => {
    const data = await registerUserApi(user);
    return data.user;
  }
);

export const userLogin = createAsyncThunk(
  'user/login',
  async (user: TLoginData) => {
    const data = await loginUserApi(user);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const checkUserAuth = createAsyncThunk('user/authCheck', async () => {
  const data = await getUserApi();
  return data.user;
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: TRegisterData) => {
    const data = await updateUserApi(user);
    return data.user;
  }
);
export const logoutUser = createAsyncThunk('auth/logout', (_, { dispatch }) => {
  logoutApi()
    .then(() => {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    })
    .catch((err) => console.log(err))
    .finally(() => {
      dispatch(logoutUser());
    });
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.iaAuthCheck = true;
    }
  },
  extraReducers: (builder) => {
    ////
    builder.addCase(checkUserAuth.pending, (state) => {
      state.requestStatus = RequestStatus.Loading;
    });
    builder.addCase(checkUserAuth.fulfilled, (state, action) => {
      state.requestStatus = RequestStatus.Success;
      state.data = action.payload;
    });
    builder.addCase(checkUserAuth.rejected, (state) => {
      state.requestStatus = RequestStatus.Failed;
    });
    ////
    builder.addCase(userLogin.pending, (state) => {
      state.requestStatus = RequestStatus.Loading;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.requestStatus = RequestStatus.Success;
      state.data = action.payload;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.requestStatus = RequestStatus.Failed;
    });
    ////
    builder.addCase(userRerister.pending, (state) => {
      state.requestStatus = RequestStatus.Loading;
    });
    builder.addCase(userRerister.fulfilled, (state, action) => {
      state.requestStatus = RequestStatus.Success;
      state.data = action.payload;
    });
    builder.addCase(userRerister.rejected, (state) => {
      state.requestStatus = RequestStatus.Failed;
    });
    ////
    builder.addCase(updateUser.pending, (state) => {
      state.requestStatus = RequestStatus.Loading;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.requestStatus = RequestStatus.Success;
      state.data = action.payload;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.requestStatus = RequestStatus.Failed;
    });
    ////
    builder.addCase(logoutUser.pending, (state) => {
      state.requestStatus = RequestStatus.Loading;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.requestStatus = RequestStatus.Success;
      state.data = null;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.requestStatus = RequestStatus.Failed;
    });
  },
  selectors: {
    selectorUserData: (state) => state.data,
    selectorAuthCheck: (state) => state.iaAuthCheck
  }
});

export const userActions = userSlice.actions;
export const { selectorUserData, selectorAuthCheck } = userSlice.selectors;
export default userSlice.reducer;
