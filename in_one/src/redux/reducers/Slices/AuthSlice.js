import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    customer: {
        customerName: "",
        customerMobile_NO: "",
    },
  };



  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
     
        SET_CUSTOMER(state, action) {
            // console.log("action",action.payload);
        const profile = action.payload;
        state.customer.customerName = profile.customerName;
        state.customer.customerMobile_NO = profile.customerMobile_NO;
      },
    },
  });
  
  export const {SET_CUSTOMER } = authSlice.actions;
  
  // export const selectCustomer = (state) => console.log("auth", state);
  
  export default authSlice.reducer;
  
  