import axios from "axios";
import { toast } from "react-toastify";


import { BACKEND_URL } from "../../../config/config";

// export const validateEmail = (email) => {
//   return email.match(
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   );
// };



// Register customer
export const registerCustomer = async (values) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/customer/registercustomer`,
        values,
        { withCredentials: true }
      );

      if(response.data.status === 400){
        toast.error(response.data.message)        
      }

        if(response.data.status === 200){
          toast.success(response.data.message)

          //console.log("tott", response.data);
          
         // localStorage.setItem("webtoken", response.data.token);

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


  
// Login User
export const loginCustomer = async (values) => {
  //console.log("service", values);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/customer/logincustomer`,
        values
      );


      if(response.data.status === 400){
        toast.error(response.data.message);
        // alert(response.data.message);
        }

        if(response.data.status === 200){
          toast.success(response.data.message);
         // console.log("tott", response.data);
          
          localStorage.setItem("customertoken", response.data.token);

          return response.data;	
    
          }

      // console.log("responcsss", response);
      // if (response.statusText === "OK") {
      //   console.log("res sta", response.statusText)
      //   alert(response.data.message);
      // }
     
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };
  


  // Logout User
  export const logoutCustomer = async () => {
    
    try {
      let response = await axios.get(`${BACKEND_URL}/api/customer/logout`,{
        headers: {
          authorization: `Bearer ${localStorage.getItem("customertoken")}` 
        }
      });
      

      if(response.data.status === 400){
        toast.error(response.data.message);
        // alert(response.data.message);
        }

      if(response.data.status === 200){
        toast.success(response.data.message);
        localStorage.clear();
        //1 seconds to reload
      setTimeout(function() {
        window.location.reload(true); // Reload from server
      }, 1000);
        }

    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };


  //get customer data
//   export const getCustomerData = async () => {

//   try {

//     const response =await axios.get(`${BACKEND_URL}/api/customer/getcustomerdata`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("customertoken")}` 
//       }
//     });
//     //console.log("responsssssse", response.data);

//     if(response.data.status === 400){
//       toast.error(response.data.message);
//       // alert(response.data.message);
//       }

//       if(response.data.status === 200){
//         return response.data;	
      
  
//         }

   
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     toast.error(message);
//   }
// };



