// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import cartReducer from './cart/cartSlice';
import userReducer from './user/userSlice';
import orderReducer from './order/orderSlice';
import orderItemReducer from './orderItem/orderItemSlice';
import paymentReducer from './payment/paymentSlice';
const rootReducer = combineReducers({
  Cart: cartReducer,
  User: userReducer,
  Order:orderReducer,
  OrderItem:orderItemReducer,
  Payment:paymentReducer

});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;