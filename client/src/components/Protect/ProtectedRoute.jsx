import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); 
  const isAuthenticated = !!token; 

  console.log('ProtectedRoute Check:', { token, isAuthenticated }); 
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;