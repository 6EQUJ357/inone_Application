import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {

      state.cartItems.push(action.payload);
      // const existingItem = state.cartItems.find(
      //   (item) => item.id === action.payload.id
      // );

      // if (existingItem) {
      //   existingItem.quantity += 1;
      // } else {
      //   state.cartItems.push({ ...action.payload, quantity: 1 });
      // }
    },
    // removeFromCart: (state, action) => {
    //   state.cartItems = state.cartItems.filter(
    //     (item) => item.id !== action.payload.id
    //   );
    // }
  },
});

export const { addToCart} = cartSlice.actions;
export default cartSlice.reducer;