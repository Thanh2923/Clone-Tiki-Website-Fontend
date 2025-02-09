
// src/redux/orderThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {  OrderItem } from '@/types';
import { getAuthHeaders } from '@/utils/session';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const fetchOrderItemById = createAsyncThunk<OrderItem[], number>( // Đổi kiểu trả về thành OrderItem[]
    'orders/fetchOrderItemById',
    async (orderId: number) => { // Đảm bảo tham số là orderId
      try {
        const headers = await getAuthHeaders(); 
        const response = await axios.get(`${API_URL}/orderItem/${orderId}`, {
          headers
        });
        return response.data; // Trả về dữ liệu item của đơn hàng
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
        }
        return []; // Trả về mảng rỗng trong trường hợp lỗi
      }
    }
  );