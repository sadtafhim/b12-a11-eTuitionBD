"use client";

import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../../assets/logo.png";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const { signInUser, signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        navigate(location?.state || "/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your have successfully logged in",
          showConfirmButton: false,
          timer: 1000
        });
      })
      .catch((err) => {
        console.error("Login failed:", err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: err.message || "Something went wrong",
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };

  const handleSignInWithGoogle = () => {
    signInGoogle()
      .then((result) => {
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          role: "student",
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          navigate(location?.state || "/");
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your have successfully logged in",
          showConfirmButton: false,
          timer: 1000
        });
      })
      .catch((err) => Swal.fire({
        position: "top-end",
        icon: "error",
        title: err.message || "Something went wrong",
        showConfirmButton: false,
        timer: 1000,
      }));
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center py-12 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-base-200 relative">

        <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-base-200">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-sm font-semibold uppercase text-accent tracking-widest mb-2">
              Welcome Back
            </h2>
            <h1 className="text-4xl font-extrabold text-base-content">
              User Login
            </h1>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-base-content opacity-70">Email Address</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-50" />
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="input w-full pl-12 bg-base-100 border-none rounded-xl focus:ring-2 focus:ring-primary shadow-sm text-base-content"
                  placeholder="Enter Email"
                />
              </div>
              {errors.email && (
                <p className="text-error text-xs mt-2 ml-1 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-base-content opacity-70">Password</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-50" />
                <input
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className="input w-full pl-12 bg-base-100 border-none rounded-xl focus:ring-2 focus:ring-primary shadow-sm text-base-content"
                  placeholder="Enter Password"
                />
              </div>
              {errors.password && (
                <p className="text-error text-xs mt-2 ml-1 font-medium">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full rounded-full font-bold shadow-lg shadow-primary/20 mt-4 hover:scale-[1.02] transition-all"
            >
              Sign In <FaArrowRight />
            </button>

            <div className="divider text-xs opacity-50 uppercase font-bold tracking-widest">OR</div>

            <button
              type="button"
              onClick={handleSignInWithGoogle}
              className="btn btn-outline border-base-300 w-full rounded-full font-bold bg-base-100 hover:bg-base-300 transition-all gap-3"
            >
              <FcGoogle size={20} /> Continue with Google
            </button>

            <p className="mt-8 text-center text-sm text-base-content opacity-70 font-medium">
              New here?{" "}
              <Link
                state={location.state}
                to="/auth/register"
                className="text-primary hover:underline font-bold"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden lg:flex w-1/2 flex-col justify-center items-center p-16 bg-primary text-primary-content relative">

          <div className="absolute w-64 h-64 bg-white/10 rounded-full -top-20 -right-20 blur-3xl"></div>
          <div className="absolute w-40 h-40 bg-accent/20 rounded-full -bottom-10 -left-10 blur-2xl"></div>

          <img src={logo} alt="eTuitionBd" className="w-56 mb-8 drop-shadow-2xl" />

          <div className="text-center relative z-10">
            <h3 className="text-3xl font-extrabold mb-4">
              Your Learning Journey <br /> Starts Here.
            </h3>
            <p className="text-white/80 leading-relaxed max-w-sm mx-auto">
              Securely access your tutor applications, schedules, and personalized student profiles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;