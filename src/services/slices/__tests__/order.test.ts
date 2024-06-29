import { RequestStatus, TOrder } from '@utils-types';
import orderSlice, { getOrder, initialState, submitOrder } from '../order';

const mockOrder: TOrder[] = [
  {
    _id: '1',
    status: 'new',
    name: 'Имя',
    createdAt: '2022-01-01T10:00:00.000Z',
    updatedAt: '2022-01-01T10:00:00.000Z',
    number: 1,
    ingredients: []
  },
  {
    _id: '2',
    status: 'new',
    name: 'Имя2',
    createdAt: '2022-01-01T10:00:00.000Z',
    updatedAt: '2022-01-01T10:00:00.000Z',
    number: 2,
    ingredients: []
  }
];

describe('Тест slise order', () => {
  it('Статус submitOrder pending', () => {
    const state = orderSlice(initialState, submitOrder.pending('', []));
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  it('Статус submitOrder success', () => {
    const state = orderSlice(
      initialState,
      submitOrder.fulfilled(
        { success: true, order: mockOrder[0], name: '' },
        '',
        []
      )
    );
    expect(state.requestStatus).toBe(RequestStatus.Success);
    expect(state.order).toEqual(mockOrder[0]);
  });

  it('Статус submitOrder failed', () => {
    const state = orderSlice(
      initialState,
      submitOrder.rejected(new Error('Network error'), '', [])
    );
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });

  it('Статус getOrder pending', () => {
    const state = orderSlice(initialState, getOrder.pending('', 1));
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  it('Статус getOrder success', () => {
    const state = orderSlice(
      initialState,
      getOrder.fulfilled({ success: true, orders: mockOrder }, '', 1)
    );
    expect(state.requestStatus).toBe(RequestStatus.Success);
    expect(state.orderInfo).toEqual(mockOrder[0]);
  });

  it('Статус getOrder failed', () => {
    const state = orderSlice(
      initialState,
      getOrder.rejected(new Error('Network error'), '', 1)
    );
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });
});
