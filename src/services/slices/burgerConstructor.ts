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
    }
  },
  extraReducers: (builder) => {},
  selectors: {
    selectorConstructorData: (state) => state.ingredients
  }
});

export const { addToBurgerConstructor } = burgerConstructorSlice.actions;
export const { selectorConstructorData } = burgerConstructorSlice.selectors;
export default burgerConstructorSlice.reducer;
