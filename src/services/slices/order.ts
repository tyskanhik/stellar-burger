import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

interface OrderState {
  orderInfo: TOrder | null;
  order: TOrder | null;
  requestStatus: RequestStatus;
}

const initialState: OrderState = {
  orderInfo: null,
  order: null,
  requestStatus: RequestStatus.Idle
};

export const submitOrder = createAsyncThunk(
  'orders/submitOrder',
  async (data: string[]) => {
    const order = await orderBurgerApi(data);
    return order;
  }
);

export const getOrder = createAsyncThunk(
  'orders/getOrder',
  async (id: number) => {
    const order = await getOrderByNumberApi(id);
    return order;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.requestStatus = RequestStatus.Idle;
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(submitOrder.pending, (state) => {
      state.requestStatus = RequestStatus.Loading;
    });
    builder.addCase(submitOrder.fulfilled, (state, action) => {
      state.requestStatus = RequestStatus.Success;
      state.order = action.payload.order;
    });
    builder.addCase(submitOrder.rejected, (state) => {
      state.requestStatus = RequestStatus.Failed;
    });
    builder.addCase(getOrder.pending, (state) => {
      state.requestStatus = RequestStatus.Loading;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.requestStatus = RequestStatus.Success;
      state.orderInfo = action.payload.orders[0];
    });
    builder.addCase(getOrder.rejected, (state) => {
      state.requestStatus = RequestStatus.Failed;
    });
  },
  selectors: {
    selectorOrderStatus: (state) => state.requestStatus,
    selectorOrderData: (state) => state.order
  }
});

export const { clearOrder } = orderSlice.actions;
export const { selectorOrderStatus, selectorOrderData } = orderSlice.selectors;
export default orderSlice.reducer;
