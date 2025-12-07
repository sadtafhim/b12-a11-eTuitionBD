import React from "react";
import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
  },
]);

export default router;
