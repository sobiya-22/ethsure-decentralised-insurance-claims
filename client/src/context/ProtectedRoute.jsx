import React from "react";
import { Navigate } from "react-router-dom";
import { getRoleFromToken, isLoggedIn } from "../utils/decodeJWT";

export default function ProtectedRoute({ children, allowedRoles }) {
  const role = getRoleFromToken();

  // Not logged in → redirect to login
  if (!isLoggedIn()) return <Navigate to="/" replace />;

  // Role mismatch → redirect to role select
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/role-select" replace />;
  }

  return children;
}