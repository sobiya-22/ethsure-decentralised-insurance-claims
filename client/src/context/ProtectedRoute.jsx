import React from "react";
import { Navigate } from "react-router-dom";
import { getRoleFromToken, isLoggedIn } from "../utils/decodeJWT";
import { useAuth } from "./AuthContext";
import { FullPageLoader } from "../components/ui/Loader"; 

export default function ProtectedRoute({ children, allowedRoles }) {
  const { token, loading } = useAuth();

  // Still restoring session , show loader
  if (loading) {
    return <FullPageLoader message="Authenticating your session..." />; 
  }

  // Not logged in , redirect to login
  if (!token || !isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // Role validation
  const role = getRoleFromToken();

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/role-select" replace />;
  }

  return children;
}
