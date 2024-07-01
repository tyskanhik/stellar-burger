import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder, TOrdersData } from '@utils-types';

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  statys: RequestStatus;
}

export const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  statys: RequestStatus.Idle
};

export const getFeed = createAsyncThunk<TOrdersData>('feed/get', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeed.pending, (state) => {
      state.statys = RequestStatus.Loading;
    });
    builder.addCase(getFeed.fulfilled, (state, action) => {
      state.statys = RequestStatus.Success;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
    builder.addCase(getFeed.rejected, (state) => {
      state.statys = RequestStatus.Failed;
    });
  }
});

export const feedActions = feedSlice.actions;
export default feedSlice.reducer;
