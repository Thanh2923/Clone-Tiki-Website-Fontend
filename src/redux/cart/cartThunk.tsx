import { createAsyncThunk } from "@reduxjs/toolkit";
import axios,{ AxiosError }  from "axios";
import { getAuthHeaders } from "@/utils/session";
import { UpdateCart } from "@/types";

// Khởi tạo kiểu dữ liệu cho giỏ hàng
interface CartItem {
  productId: number;
  quantity: number;
}





const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// **1. Add to Cart**
export const addCart = createAsyncThunk(
  "cart/addCart",
  async (cartItem: CartItem) => {
    try {
    
      const headers = await getAuthHeaders(); 
      
      // Correct the axios call to use `headers`
      const response = await axios.post(`${apiUrl}/cart`, cartItem, {
        headers,
      });
      
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
      }
     
    }
  }
);

// **2. Update Cart Quantity**
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (updateQuantity:UpdateCart) => {
    try {
      const headers = await getAuthHeaders(); 
      
    await axios.put(`${apiUrl}/cart/${updateQuantity.cartId}`,updateQuantity,{
        headers
      });
      return updateQuantity;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
      }
    }
  }
);

export const fetchCartByIdUser = createAsyncThunk(
  "cart/fetchCartByIdUser",
  async (_, { rejectWithValue }) => { // Không cần truyền userId, thay vào đó lấy từ session
    try {
    
      const headers = await getAuthHeaders(); // Lấy headers nếu cần

      const response = await axios.get(`${apiUrl}/cart`, { // Sử dụng userId từ session trong URL
        headers,
      });

      return response.data; 
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || error.message); // Trả về lỗi nếu có
      }
     
    }
  }
);

// **4. Remove Cart Item by ID**
export const removeCartById = createAsyncThunk(
  "cart/removeCartById",
  async (cartId: number[],) => {
    try {
      const headers = await getAuthHeaders(); // Lấy headers nếu cần
      await axios.delete(`${apiUrl}/cart`,{
        headers,
        data: { cartId }
      });
      return cartId;
    } catch (error) {
      if (error instanceof AxiosError) {
       console.log(error)
      }
    }
  }
);



// **4. Remove Cart Item by ID**
export const removeAllCartByUserId = createAsyncThunk(
  "cart/removeAllCartByUserId",
  async () => {
    try {
      const headers = await getAuthHeaders(); // Lấy headers nếu cần
      await axios.delete(`${apiUrl}/cart/removeAllCart`,{
        headers
      });
      return [];
    } catch (error) {
      if (error instanceof AxiosError) {
       console.log(error)
      }
    }
  }
);
