import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaCalendarAlt,
  FaSave,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ProfileSetting = () => {
  const { user, updateUserProfile, updateUserEmail, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  // Initialize form with existing user data
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1. Update Database via the self-service "profile/update" route
      // This route identifies the user via their JWT token (req.user)
      const res = await axiosSecure.patch(`/users/profile/update`, {
        displayName: data.displayName,
        email: data.email.toLowerCase(),
      });

      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        // 2. Update Firebase Display Name
        await updateUserProfile(data.displayName, user?.photoURL);

        // 3. Handle Email Change in Firebase
        // Note: Firebase requires a recent login to change email
        if (data.email.toLowerCase() !== user?.email.toLowerCase()) {
          try {
            await updateUserEmail(data.email);
            Swal.fire({
              title: "Profile & Email Updated!",
              text: "For security, please log in again with your new email.",
              icon: "success",
            }).then(() => logOut());
          } catch (firebaseErr) {
            Swal.fire({
              title: "Action Required",
              text: "Name updated, but to change your email, please log out and log back in first (Firebase Security).",
              icon: "info",
            });
          }
        } else {
          Swal.fire({
            title: "Success!",
            text: "Your profile has been updated successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 px-4">
      <div className="bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-200">
        {/* Header Section */}
        <div className="bg-primary p-8 text-white text-center">
          <div className="avatar mb-4">
            <div className="w-24 h-24 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
              <img
                src={user?.photoURL || "https://i.ibb.co/Y4Xqwjcg/logo-web.png"}
                alt="User"
              />
            </div>
          </div>
          <h2 className="text-3xl font-black">Account Settings</h2>
          <p className="opacity-80">Manage your profile information</p>
        </div>

        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Editable Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-500 uppercase tracking-wide">
                  Full Name
                </span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  {...register("displayName", { required: "Name is required" })}
                  className="input input-bordered w-full pl-12 focus:border-primary"
                  placeholder="Enter your name"
                />
              </div>
              {errors.displayName && (
                <span className="text-error text-xs mt-1">
                  {errors.displayName.message}
                </span>
              )}
            </div>

            {/* Editable Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-500 uppercase tracking-wide">
                  Email Address
                </span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="input input-bordered w-full pl-12 focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <span className="text-error text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Non-Editable Info Section */}
            <div className="divider opacity-50">Account Details</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 bg-base-200 rounded-2xl">
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <FaShieldAlt className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase opacity-50">
                    Current Role
                  </p>
                  <p className="font-bold capitalize">
                    {user?.role || "Student"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-base-200 rounded-2xl">
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <FaCalendarAlt className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase opacity-50">
                    Member Since
                  </p>
                  <p className="font-bold">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "2025-12-16"}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`btn btn-primary btn-block shadow-lg gap-2 text-white ${loading ? "loading" : ""
                  }`}
              >
                {!loading && <FaSave />}
                {loading ? "Updating Account..." : "Save All Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
