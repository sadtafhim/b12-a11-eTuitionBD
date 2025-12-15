import React from "react";
import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import Contacts from "../pages/Contacts/Contacts";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import PostNewTuition from "../Student/PostNewTuition/PostNewTuition";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import PrivateRoutes from "./PrivateRoutes";
import MyTuitions from "../Student/MyTuitions/MyTuitions";
import EditTuition from "../Student/EditTuition/EditTuition";
import ErrorPage from "../shared/Components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contacts",
        element: <Contacts></Contacts>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard/post-new-tuition",
        element: <PostNewTuition></PostNewTuition>,
      },
      {
        path: "/dashboard/my-tuitions",
        element: <MyTuitions></MyTuitions>,
      },
      {
        path: "/dashboard/edit-tuition/:id",
        element: <EditTuition></EditTuition>,
      },
    ],
  },
]);

export default router;
