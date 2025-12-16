import React from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaTag,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { format } from "date-fns";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UserProfileModal = ({ userId, onClose }) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["singleUser", userId],
    queryFn: async () => {
      if (!userId) return null;
      const res = await axiosSecure.get(`/users/${userId}`);
      return res.data;
    },
    enabled: !!userId,
  });

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "badge-error";
      case "tutor":
        return "badge-warning";
      default:
        return "badge-success";
    }
  };

  return (
    <dialog id="user_profile_modal" className="modal modal-open">
      <div className="modal-box w-11/12 max-w-lg">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-2xl text-primary mb-4">
          User Profile Details
        </h3>

        {isLoading && (
          <div className="text-center py-6">
            <span className="loading loading-spinner text-primary"></span>
            <p className="mt-2">Loading user data...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-6 text-error">
            <p>Error loading profile: {error.message}</p>
          </div>
        )}

        {user && (
          <div className="flex flex-col items-center p-4 bg-base-100 rounded-lg shadow-inner">
            <div className="avatar mb-4">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    user.photoURL || (
                      <FaUserCircle className="w-full h-full text-base-content/50" />
                    )
                  }
                  alt={`${user.displayName} profile`}
                />
              </div>
            </div>

            <h4 className="text-3xl font-bold mb-2">
              {user.displayName || "Name Not Set"}
            </h4>
            <div className="flex items-center space-x-2 mb-6">
              <span
                className={`badge badge-lg ${getRoleColor(
                  user.role
                )} capitalize font-semibold`}
              >
                <FaTag className="mr-1" /> {user.role || "student"}
              </span>
            </div>

            <div className="w-full space-y-3">
              <div className="flex items-center text-lg">
                <FaEnvelope className="text-primary w-5 h-5 mr-3" />
                <span>{user.email}</span>
              </div>

              <div className="flex items-center text-lg">
                <FaClock className="text-primary w-5 h-5 mr-3" />
                <span>
                  Joined:{" "}
                  {user.createdAt
                    ? format(new Date(user.createdAt), "MMM dd, yyyy")
                    : "N/A"}
                </span>
              </div>

              {user.phone && (
                <div className="flex items-center text-lg">
                  <FaCheckCircle className="text-primary w-5 h-5 mr-3" />
                  <span>Phone: {user.phone}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="modal-action mt-6">
          <button className="btn btn-primary w-full" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UserProfileModal;
