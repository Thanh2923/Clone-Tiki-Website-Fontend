// src/redux/orderThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Order } from '@/types';
import { getAuthHeaders } from '@/utils/session';

interface OrderPay {
  totalPrice: number;
  orderDetail: {
    productId: number;
    quantity: number;
    price: number;
  }[];
  cartId: number[];
}


const API_URL = process.env.NEXT_PUBLIC_API_URL;
// Fetch all orders
export const fetchOrders = createAsyncThunk<Order[], void>(
  'orders/fetchOrders',
  async () => {
    try {
      const response = await axios.get(`${API_URL}/order`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
                    console.log(error)
                   }
    }
  }
);

// Fetch order by ID
export const fetchOrderById = createAsyncThunk<Order[], void>(
  'orders/fetchOrderById',
  async () => {
    try {
      const headers = await getAuthHeaders(); 
      const response = await axios.get(`${API_URL}/order/byId`,{
        headers
      });
      return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error)
           }
    }
  }
);





// Create new order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: OrderPay) => {
    try {
      const headers = await getAuthHeaders(); 
      const response = await axios.post(`${API_URL}/order`,orderData,{
        headers
      });
       return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error)
           }
    }
  }
);


export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (order:OrderPay) => {
    try {
      const response = await axios.put(`${API_URL}`, order);
      return response.data;
    }catch (error) {
        if (error instanceof AxiosError) {
            console.log(error)
           }
    }
  }
);

// Remove order
export const removeOrder = createAsyncThunk(
  'orders/removeOrder',
  async (orderId) => {
    try {
      await axios.delete(`${API_URL}/${orderId}`);
      return orderId;
    }catch (error) {
        if (error instanceof AxiosError) {
            console.log(error)
           }
    }
  }
);
