import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../../assets/logo.png";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState("student");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    const finalData = { ...data, role: selectedRole };
    console.log("Registration Data:", finalData);

    // --- Backend/Auth Integration Logic Goes Here ---
    // 1. Firebase Authentication (Create User with Email/Password)
    // 2. Save user profile (name, email, phone, role) to MongoDB
    // ----------------------------------------------------
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center py-10">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl">
        <div className="w-full lg:w-1/2 p-8 md:p-12 bg-base-100 flex flex-col justify-center">
          <h2 className="text-3xl font-heading font-bold text-base-content mb-6 text-center">
            Create Your Account
          </h2>

          <div className="flex justify-around gap-4 mb-8">
            <button
              type="button"
              onClick={() => setSelectedRole("student")}
              className={`btn btn-sm md:btn-md font-heading ${
                selectedRole === "student"
                  ? "btn-primary shadow-lg"
                  : "btn-outline btn-primary/70"
              }`}
            >
              <FaUserGraduate className="text-lg" /> Register as Student
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("tutor")}
              className={`btn btn-sm md:btn-md font-heading ${
                selectedRole === "tutor"
                  ? "btn-primary shadow-lg"
                  : "btn-outline btn-primary/70"
              }`}
            >
              <FaChalkboardTeacher className="text-lg" /> Register as Tutor
            </button>
          </div>

          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="space-y-4"
          >
            <div>
              <label className="label text-base-content font-medium font-body">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full bg-base-200 text-base-content"
                placeholder="Full Name"
              />
              {errors.name && (
                <p className="text-error text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

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
              <label className="label text-[--color-base-content] font-medium font-body">
                Phone
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^\+?\d{10,14}$/,
                    message: "Invalid phone number format",
                  },
                })}
                className="input input-bordered w-full bg-base-200 text-base-content"
                placeholder="e.g., +880 1XXXXXXXXX"
              />
              {errors.phone && (
                <p className="text-error text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="label text-base-content font-medium font-body">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters or longer",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Must include 6+ chars, upper/lower case, number, and symbol.",
                  },
                })}
                className="input input-bordered w-full bg-base-200 text-base-content"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-accent mt-6 w-full font-heading text-accent-content shadow-md transition-transform hover:scale-[1.01]"
            >
              Register as {selectedRole.toUpperCase()}
            </button>

            <div className="mt-4 text-center text-sm text-base-content opacity-80">
              Already have an account?{" "}
              <a
                href="/login"
                className="link link-hover text-primary font-medium"
              >
                Login Here
              </a>
            </div>
          </form>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 flex-col justify-center items-center p-12 bg-primary text-primary-content">
          <img src={logo} alt="eTuitionBd Logo" className="w-48 mb-6" />
          <h3 className="text-3xl font-heading font-bold text-center mb-4">
            The Future of Learning
          </h3>
          <p className="text-center text-lg opacity-90">
            Join the eTuitionBd community to find the perfect tutor or your next
            teaching opportunity.
          </p>
          <p className="mt-4 text-sm opacity-70">
            Secure, Verified, and Easy to Use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
