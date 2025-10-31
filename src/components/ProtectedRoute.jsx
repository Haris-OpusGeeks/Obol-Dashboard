import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn, access_token } = useSelector((state) => state.auth);

  // If user isn't logged in or token missing, redirect to /access-denied
  if (!isLoggedIn || !access_token) {
    console.warn("Access denied: user not logged in");
    return <Navigate to="/access-denied" replace />;
  }

  // Otherwise, allow access
  return element;
};

export default ProtectedRoute;
