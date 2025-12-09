import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../../assets/logo.png";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    console.log("Login Attempt Data:", data);

    signInUser(data.email, data.password)
      .then((result) => {
        console.log("Login successful:", result.user);
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center py-10">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl">
        <div className="w-full lg:w-1/2 p-8 md:p-12 bg-base-100 flex flex-col justify-center">
          <h2 className="text-3xl font-heading font-bold text-base-content mb-8 text-center">
            Log In to Your Account
          </h2>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div>
              <label className="label text-base-content font-medium font-body">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full bg-base-200 text-base-content"
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="label text-base-content font-medium font-body">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="input input-bordered w-full bg-base-200 text-base-content"
                placeholder="Your Password"
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* <div className="text-right">
              <a
                href="/reset-password"
                className="link link-hover text-primary text-sm font-medium"
              >
                Forgot password?
              </a>
            </div> */}

            <button
              type="submit"
              className="btn btn-accent mt-6 w-full font-heading text-accent-content shadow-md transition-transform hover:scale-[1.01]"
            >
              Login
            </button>

            <div className="mt-4 text-center text-sm text-base-content opacity-80">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="link link-hover text-primary font-medium"
              >
                Register Here
              </Link>
            </div>
          </form>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 flex-col justify-center items-center p-12 bg-primary text-primary-content">
          <img src={logo} alt="eTuitionBd Logo" className="w-48 mb-6" />
          <h3 className="text-3xl font-heading font-bold text-center mb-4">
            Welcome Back!
          </h3>
          <p className="text-center text-lg opacity-90">
            Securely access your tutor applications, schedules, and student
            profiles.
          </p>
          <p className="mt-4 text-sm opacity-70">
            Connect and continue your journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
