import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div>
        <span className="loading loading-spinner text-accent"></span>;
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login"></Navigate>;
  }

  return children;
};

export default PrivateRoutes;
