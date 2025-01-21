
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../Slices/AuthSlice'; 
import cartReducer from '../Slices/CartSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

export default rootReducer;