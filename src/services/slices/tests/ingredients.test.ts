import { RequestStatus, TIngredient } from '@utils-types';
import ingredientSlice, { initialState, getIngredients } from '../ingredients';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_large: '',
    image_mobile: ''
  },
  {
    _id: '2',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 12,
    fat: 33,
    carbohydrates: 22,
    calories: 33,
    price: 123,
    image: '',
    image_large: '',
    image_mobile: ''
  },
  {
    _id: '3',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 10,
    fat: 15,
    carbohydrates: 30,
    calories: 50,
    price: 80,
    image: '',
    image_large: '',
    image_mobile: ''
  },
  {
    _id: '4',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 10,
    fat: 5,
    carbohydrates: 25,
    calories: 45,
    price: 60,
    image: '',
    image_large: '',
    image_mobile: ''
  }
];

describe('slice ingredients', () => {
  it('Статус pending', async () => {
    const state = ingredientSlice(initialState, getIngredients.pending(''));
    expect(state.status).toBe(RequestStatus.Loading);
  });

  it('Статус Success и запись ингредиентов в state', () => {
    const state = ingredientSlice(
      initialState,
      getIngredients.fulfilled(mockIngredients, '')
    );
    expect(state.status).toBe(RequestStatus.Success);
    expect(state.data).toEqual(mockIngredients);
  });

  it('Статус Failed', () => {
    const state = ingredientSlice(
      initialState,
      getIngredients.rejected(new Error('Network error'), '')
    );
    expect(state.status).toBe(RequestStatus.Failed);
  });
});
