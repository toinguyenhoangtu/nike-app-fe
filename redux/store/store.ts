import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import cartSlice from "./slice/cart/index";
export const store = configureStore({
  reducer: {
    cart: cartSlice
  }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// use useAppDispatch when use createAsyncThunk
export const useAppDispatch = () => useDispatch<AppDispatch>()