import axios from "axios";
import { toast } from "react-toastify";

import {BACKEND_URL} from "../../../config/config"






//get company data
export const getCompanyData = async () => {

    try {

      const response =await axios.get(`${BACKEND_URL}/api/company/getcompanydata`);
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



    //  post contact form
    export const contactForm = async (values) => {
        //console.log("service", values);
          try {
            const response = await axios.post(
              `${BACKEND_URL}/api/contact/contactform`,
              values
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


