import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

interface OrdesState {
  data: TOrder[];
  requestStatus: RequestStatus;
}

const initialState: OrdesState = {
  data: [],
  requestStatus: RequestStatus.Idle
};

export const getOrdes = createAsyncThunk('orders/getOrders', async () => {
  const data = await getOrdersApi();
  return data;
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdes.pending, (state) => {
      state.requestStatus = RequestStatus.Loading;
    });
    builder.addCase(getOrdes.fulfilled, (state, action) => {
      state.data = action.payload;
      state.requestStatus = RequestStatus.Success;
    });
    builder.addCase(getOrdes.rejected, (state) => {
      state.requestStatus = RequestStatus.Failed;
    });
  }
});

export default ordersSlice.reducer;
