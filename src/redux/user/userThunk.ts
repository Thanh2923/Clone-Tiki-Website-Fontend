// src/redux/userThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { User } from '@/types';
import { getAuthHeaders } from '@/utils/session';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch Users
export const fetchUsers = createAsyncThunk<User[]>(
  'user/fetchUsers',
  async () => {
    try {
        const headers = await getAuthHeaders(); 
      const response = await axios.get(`${API_URL}/users`,{
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

export const fetchUsersById = createAsyncThunk<User[]>(
    'user/fetchUsersById',
    async () => {
      try {
        const headers = await getAuthHeaders(); 
        const response = await axios.get(`${API_URL}/users/byId`,{
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

// Create User
export const createUser = createAsyncThunk<User, { name: string; phone: string; address: string }>(
  'user/createUser',
  async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users`, userData);
      return response.data;
    } catch (error) {
          if (error instanceof AxiosError) {
       console.log(error)
      }
     
    }
  }
);

export const updateUser = createAsyncThunk<User, {name: string; phone: string; address: string,email?: string  }>(
  'user/updateUser',
  async (userData) => {
    try {
     const headers = await getAuthHeaders(); 
      const response = await axios.patch(`${API_URL}/users`, userData,{
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

// Remove User
export const removeUser = createAsyncThunk<string, string>(
  'user/removeUser',
  async () => {
    try {
     const response =  await axios.delete(`${API_URL}/users`);
      return response.data;
    } catch (error) {
          if (error instanceof AxiosError) {
       console.log(error)
      }
      
    }
  }
);
