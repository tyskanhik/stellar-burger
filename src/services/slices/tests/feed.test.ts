import { RequestStatus, TOrder, TOrdersData } from '@utils-types';
import feedSlice, { getFeed, initialState } from '../feed';

const mockOrderData: TOrdersData = {
  orders: [
    {
      _id: '1',
      status: 'pending',
      name: 'John Doe',
      createdAt: '2022-01-01T10:00:00.000Z',
      updatedAt: '2022-01-01T10:00:00.000Z',
      number: 1,
      ingredients: ['Борщ', 'Сыр', 'Картошка']
    }
  ],
  total: 1,
  totalToday: 1
};

describe('Тест slice feed', () => {
  it('Статус pending', () => {
    const state = feedSlice(initialState, getFeed.pending(''));
    expect(state.statys).toBe(RequestStatus.Loading);
  });
  it('Статус Success и запись в state', () => {
    const state = feedSlice(initialState, getFeed.fulfilled(mockOrderData, ''));
    expect(state.statys).toBe(RequestStatus.Success);
    expect(state.orders).toEqual(mockOrderData.orders);
    expect(state.total).toBe(mockOrderData.total);
    expect(state.totalToday).toBe(mockOrderData.totalToday);
  });

  it('Статус Failed', () => {
    const state = feedSlice(
      initialState,
      getFeed.rejected(new Error('Network error'), '')
    );
    expect(state.statys).toBe(RequestStatus.Failed);
  });
});
