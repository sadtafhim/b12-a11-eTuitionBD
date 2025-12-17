import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import router from "./routes/routes";
import AuthProvider from "./providers/AuthProvider/AuthProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
