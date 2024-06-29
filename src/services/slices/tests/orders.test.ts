import { RequestStatus, TOrder } from '@utils-types';
import ordersSlice, { getOrdes, initialState } from '../ordes';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'pending',
    name: 'Заказ 1',
    createdAt: '2022-01-01T10:00:00.000Z',
    updatedAt: '2022-01-01T10:00:00.000Z',
    number: 1,
    ingredients: []
  }
];

describe('slice orders', () => {
  it('Статус pending', async () => {
    const state = ordersSlice(initialState, getOrdes.pending(''));
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  it('Статус Success и запись TOrder в state', () => {
    const state = ordersSlice(initialState, getOrdes.fulfilled(mockOrders, ''));
    expect(state.requestStatus).toBe(RequestStatus.Success);
    expect(state.data).toEqual(mockOrders);
  });

  it('Статус Failed', () => {
    const state = ordersSlice(
      initialState,
      getOrdes.rejected(new Error('Network error'), '')
    );
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });
});
