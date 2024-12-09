import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart(state, action) {
      // Check if both id and image match
      const existingIndex = state.cart.findIndex(
        (item) =>
          item.id === action.payload.id && item.image === action.payload.image
      );

      if (existingIndex >= 0) {
        // Update quantity if id and image match
        state.cart[existingIndex].quantity += action.payload.quantity;
      } else {
        // Add new entry if id or image differs
        state.cart.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      // Remove item matching both id and image
      state.cart = state.cart.filter(
        (item) =>
          !(
            item.id === action.payload.id && item.image === action.payload.image
          )
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
