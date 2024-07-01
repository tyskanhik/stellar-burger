import { combineReducers } from '@reduxjs/toolkit';
import { ingredientSlice } from '../ingredients';
import { userSlice } from '../user';
import { burgerConstructorSlice } from '../burgerConstructor';

const rootReducer = combineReducers({
  [ingredientSlice.name]: ingredientSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer
});

describe('инициализация rootReducer', () => {
  it('rootReducer', () => {
    const state = rootReducer(undefined, { type: 'init' });
    expect(state[ingredientSlice.name]).toEqual(
      ingredientSlice.reducer(undefined, { type: 'init' })
    );
    expect(state[userSlice.name]).toEqual(
      userSlice.reducer(undefined, { type: 'init' })
    );
    expect(state[burgerConstructorSlice.name]).toEqual(
      burgerConstructorSlice.reducer(undefined, { type: 'init' })
    );
  });
});
