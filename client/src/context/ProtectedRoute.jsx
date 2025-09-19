import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = localStorage.getItem("role"); // from login

  // If not logged in go to login
  if (!user) {
    return <Navigate to="/"  />;
  }

  // If logged in but role mismatch go to role select
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    alert("Select your role first");
    return <Navigate to="/role-select" replace />;
  }

  // If everything fine render child
  return children;
}
