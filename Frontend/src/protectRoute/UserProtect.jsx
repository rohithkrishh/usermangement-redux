import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const UserProtect = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.AdminLoggedIn);
  
  if (!isLoggedIn && !isAdminLoggedIn) {
    return <Navigate to="/login" replace />; 
  }
  return children;
};

export const UserLoginProtect = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const isAdminLoggedIn = useSelector((state) => state.admin.AdminLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

