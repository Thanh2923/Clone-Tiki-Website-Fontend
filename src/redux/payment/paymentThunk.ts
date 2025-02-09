// src/redux/paymentThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { getAuthHeaders } from '@/utils/session';
import { Payment } from '@/types';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createPayment = createAsyncThunk(
  'payment/createPayment',
  async (paymentData: Payment) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.post(`${API_URL}/payment`, paymentData, { headers });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        
      }
      
    }
  }
);
