import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/users/userSlice';
import productsReducer from './features/products/productSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;