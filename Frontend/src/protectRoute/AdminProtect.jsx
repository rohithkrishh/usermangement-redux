import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function AdminProtect({ children }) {
  const isAdminLoggedIn = useSelector((state) => state.admin.AdminLoggedIn);

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export function   AdminLoginProtect({ children }) {
  const isAdminLoggedIn = useSelector((state) => state.admin.AdminLoggedIn);
 
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

 
  if (isUserLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

