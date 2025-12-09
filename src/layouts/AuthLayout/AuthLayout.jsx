import React from "react";
import Navbar from "../../shared/Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../shared/Components/Footer/Footer";

const AuthLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default AuthLayout;
