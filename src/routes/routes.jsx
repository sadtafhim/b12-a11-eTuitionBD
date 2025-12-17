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
import Career from "../pages/Career/Career";
import UserManagement from "../Admin/UserManagement/UserManagement";
import TuitionManagement from "../Admin/TuitionManagement/TuitionManagement";
import AdminAnalytics from "../Admin/AdminAnalytics/AdminAnalytics";
import TermsOfService from "../TermsOfService/TermsOfService";
import DataPolicy from "../PrivacyPolicy/DataPolicy";
import AllTuition from "../Tutor/AllTuition/AllTuition";
import MyApplications from "../Tutor/MyApplication/MyApplication";
import ProfileSetting from "../pages/Authentication/ProfileSetting/ProfileSetting";

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
      {
        path: "/career",
        element: <Career></Career>,
      },
      {
        path: "/termsofservice",
        element: <TermsOfService></TermsOfService>,
      },
      {
        path: "/privacy-policy",
        element: <DataPolicy></DataPolicy>,
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
      {
        path: "/dashboard/user-management",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "/dashboard/tuition-management",
        element: <TuitionManagement></TuitionManagement>,
      },
      {
        path: "/dashboard/reports-analytics",
        element: <AdminAnalytics></AdminAnalytics>,
      },
      {
        path: "/dashboard/all-tuitions",
        element: <AllTuition></AllTuition>,
      },
      {
        path: "/dashboard/profile",
        element: <ProfileSetting></ProfileSetting>,
      },
    ],
  },
]);

export default router;
