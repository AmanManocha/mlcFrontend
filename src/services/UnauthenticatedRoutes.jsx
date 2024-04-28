import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const UnauthenticatedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  if (token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default UnauthenticatedRoute;
