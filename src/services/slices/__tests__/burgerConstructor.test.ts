import { TConstructorIngredient } from '@utils-types';
import burgerConstructorReducer, {
  BurgerConstructorState,
  addToBurgerConstructor,
  clearStateBurgerConstructor,
  deliteIngredient,
  swapIngredient
} from '../burgerConstructor';

describe('slice burgerConstructor', () => {
  const ingredients: TConstructorIngredient[] = [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
      id: '4',
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

  const initialState: BurgerConstructorState = {
    bun: null,
    ingredients: []
  };

  it('Добавление и замена булки в конструктор', () => {
    let newState = burgerConstructorReducer(
      initialState,
      addToBurgerConstructor(ingredients[0])
    );
    expect(newState).toEqual({
      bun: ingredients[0],
      ingredients: []
    });
    newState = burgerConstructorReducer(
      initialState,
      addToBurgerConstructor(ingredients[1])
    );
    expect(newState).toEqual({
      bun: ingredients[1],
      ingredients: []
    });
  });

  it('добавление нескольких ингредиентов', () => {
    let newState = burgerConstructorReducer(
      initialState,
      addToBurgerConstructor(ingredients[2])
    );
    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredients[2]]
    });
    newState = burgerConstructorReducer(
      newState,
      addToBurgerConstructor(ingredients[3])
    );
    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredients[2], ingredients[3]]
    });
  });

  it('Удаление ингредиентов из конструктора', () => {
    const initialState: BurgerConstructorState = {
      bun: null,
      ingredients: [ingredients[2], ingredients[3]]
    };
    const newState = burgerConstructorReducer(
      initialState,
      deliteIngredient(1)
    );
    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredients[2]]
    });
  });
  it('Перемещение ингредиента', () => {
    const initialState: BurgerConstructorState = {
      bun: null,
      ingredients: [ingredients[2], ingredients[3]]
    };
    const newState = burgerConstructorReducer(
      initialState,
      swapIngredient({ index: 1, direction: 'up' })
    );
    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredients[3], ingredients[2]]
    });
  });
});
