import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ user, isAuth, role, children }) => {
  useEffect(() => {
    if (isAuth && user?.role !== role) {
      toast.error(`Access denied for ${role} route`);
    }
  }, [isAuth, user, role]);

  if (!isAuth) return <Navigate to="/" replace />;
  if (user?.role !== role) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
