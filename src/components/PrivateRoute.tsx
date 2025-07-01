import type { JSX } from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
