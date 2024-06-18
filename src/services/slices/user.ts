import { TRegisterData, registerUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';

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
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.iaAuthCheck = true;
    }
  },
  extraReducers: (builder) => {},
  selectors: {
    selectorUser: (state) => state.data,
    selectorAuthCheck: (state) => state.iaAuthCheck
  }
});

export const { selectorUser, selectorAuthCheck } = userSlice.selectors;
