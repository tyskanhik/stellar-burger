import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';

export type IngredientState = {
  data: TIngredient[];
  status: RequestStatus;
};

export const initialState: IngredientState = {
  data: [],
  status: RequestStatus.Idle
};

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'getIngredients',
  getIngredientsApi
);

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.status = RequestStatus.Success;
      state.data = action.payload;
    });
    builder.addCase(getIngredients.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
  },
  selectors: {
    selectorIngredientsData: (state) => state.data,
    selectorIngredientsStatus: (state) => state.status
  }
});

export default ingredientSlice.reducer;
export const { selectorIngredientsData, selectorIngredientsStatus } =
  ingredientSlice.selectors;
