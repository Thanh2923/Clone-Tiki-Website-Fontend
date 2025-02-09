import { createSlice } from "@reduxjs/toolkit";
import { addCart, updateQuantity, fetchCartByIdUser, removeCartById, removeAllCartByUserId } from "./cartThunk";
import { Cart, UpdateCart } from "@/types";


interface CartState {
  cartItems: Cart[];
  loading: boolean;
  error: string | null;
}


const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Cart
      .addCase(addCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;
        const newItem = action.payload;
        const existingItemIndex = state.cartItems.findIndex(item => item.productId === newItem.productId);
        if (existingItemIndex !== -1) {
          // Nếu có sản phẩm trong giỏ hàng, tăng hoặc giảm số lượng
          const existingItem = state.cartItems[existingItemIndex];
          existingItem.quantity += newItem.quantity;
        } else {
          // Nếu không có, thêm sản phẩm vào giỏ hàng
          state.cartItems.push(newItem);
        }
        state.error = null;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Quantity
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const payload = action.payload as UpdateCart | undefined;
        
        // Check if payload is defined
        if (payload) {
          state.loading = false;
          const index = state.cartItems.findIndex(item => item.id === payload.cartId);
          console.log(index);
          
          if (index !== -1) {
            state.cartItems[index].quantity = payload.quantity;
          }
          state.error = null;
        } else {
          // Handle case where payload is undefined, if necessary
          state.loading = false;
          state.error = "Failed to update quantity: Invalid payload.";
        }
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Cart By User ID
      .addCase(fetchCartByIdUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartByIdUser.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.error = null;
      })
      .addCase(fetchCartByIdUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      
      builder
      .addCase(removeCartById.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCartById.fulfilled, (state, action) => {
        const idsToRemove = action.payload as number[];
        state.loading = false;
        state.cartItems = state.cartItems.filter(item => !idsToRemove.includes(item.id));
        state.error = null;
      })
      .addCase(removeCartById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

       // Remove Cart Item
       .addCase(removeAllCartByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeAllCartByUserId.fulfilled, (state) => {

        state.loading = false;
        state.cartItems = []
        state.error = null;
      })
      
  },
});

export default cartSlice.reducer;
