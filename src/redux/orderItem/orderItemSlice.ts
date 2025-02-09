// src/redux/orderSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import {  fetchOrderItemById } from './orderItemThunk';
import { OrderItem } from '@/types';

interface OrderState {
  ordersItem: OrderItem[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  ordersItem:[],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Orders
    

      .addCase(fetchOrderItemById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersItem = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

  },
});

export default orderSlice.reducer;
