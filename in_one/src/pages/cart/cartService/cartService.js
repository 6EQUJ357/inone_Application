import axios from "axios";
import { toast } from "react-toastify";

import {BACKEND_URL} from "../../../config/config"




  // cart post form
  export const cartForm = async (cartObj) => {
    //console.log("cartForm", data);
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/cart/cartform`,
          cartObj
        );
  
  
        if(response.data.status === 400){
          toast.error(response.data.message);
          // alert(response.data.message);
          }
  
          if(response.data.status === 200){
            toast.success(response.data.message);
           // console.log("tott", response.data);
  
            return response.data;	
      
            }
  
       
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
    };



//get cart data
export const getCartData = async () => {

    try {

      const response =await axios.get(`${BACKEND_URL}/api/cart/getcartdata`);
      //console.log("responsssssse", response.data);

      if(response.data.status === 400){
        toast.error(response.data.message);
        // alert(response.data.message);
        }

        if(response.data.status === 200){
          return response.data;	
        
    
          }

     
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };