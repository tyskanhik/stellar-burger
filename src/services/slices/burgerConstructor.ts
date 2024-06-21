import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface BurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addToBurgerConstructor: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients = [...state.ingredients, action.payload];
      }
    },
    swapIngredient: (
      state,
      action: PayloadAction<{ index: number; direction: string }>
    ) => {
      const { index, direction } = action.payload;
      if (direction === 'up') {
        state.ingredients.splice(
          index - 1,
          2,
          state.ingredients[index],
          state.ingredients[index - 1]
        );
      }
      if (direction === 'down') {
        state.ingredients.splice(
          index,
          2,
          state.ingredients[index + 1],
          state.ingredients[index]
        );
      }
    },
    deliteIngredient: (state, action: PayloadAction<number, string>) => {
      state.ingredients.splice(action.payload, 1);
    }
  },
  extraReducers: (builder) => {},
  selectors: {
    selectorConstructorData: (state) => state.ingredients
  }
});

export const { addToBurgerConstructor, swapIngredient, deliteIngredient } =
  burgerConstructorSlice.actions;
export const { selectorConstructorData } = burgerConstructorSlice.selectors;
export default burgerConstructorSlice.reducer;
