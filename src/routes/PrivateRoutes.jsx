import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log("location", location);

  if (loading) {
    return (
      <div>
        <span className="loading loading-spinner text-accent"></span>;
      </div>
    );
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
  }

  return children;
};

export default PrivateRoutes;
