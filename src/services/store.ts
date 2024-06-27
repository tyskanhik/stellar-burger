import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientSlice } from './slices/ingredients';
import { userSlice } from './slices/user';
import { burgerConstructorSlice } from './slices/burgerConstructor';
import { feedSlice } from './slices/feed';
import { orderSlice } from './slices/order';
import { ordersSlice } from './slices/ordes';

const rootReducer = combineReducers({
  [ingredientSlice.name]: ingredientSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
