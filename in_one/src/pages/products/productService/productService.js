import axios from "axios";
import { toast } from "react-toastify";

import {BACKEND_URL} from "../../../config/config"





//get product data
export const getProductData = async () => {

    try {

      const response =await axios.get(`${BACKEND_URL}/api/product/getproductdata`);
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