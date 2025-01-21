import React from "react";
import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('customertoken'); // Replace with your token storage method

    if (!token) {
      return <Navigate to="/registration_login" />;
    }
  
    return children;
};

export default ProtectedRoute;



