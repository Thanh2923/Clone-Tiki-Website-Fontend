// src/redux/orderSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchOrders, fetchOrderById, createOrder, updateOrder, removeOrder } from './orderThunk';
import { Order} from '@/types';

interface OrderState {
  orders: Order[];
  orderId:number | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  orderId:null,
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
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


     // Fetch Orders
     .addCase(fetchOrderById.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchOrderById.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = null;
    })
    .addCase(fetchOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderId = action.payload
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Order
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Remove Order
      .addCase(removeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeOrder.fulfilled, (state) => {
        state.loading = false;
        // state.orders = state.orders.filter(order => order.id !== action.payload);
        state.error = null;
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
