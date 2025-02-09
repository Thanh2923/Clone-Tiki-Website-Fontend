// src/redux/paymentSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { createPayment } from './paymentThunk';

interface PaymentState {
  payment: PaymentResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  payment: null,
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default paymentSlice.reducer;
