import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaEdit, FaUserTag, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Adjust path as needed
import { format } from "date-fns";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users (since we don't pass an 'email' query, the backend returns the array)
  const {
    data: users = [], // Default to an empty array
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      // The backend /users route returns an array of all users when no email is provided.
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // --- Loading and Error States ---
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-2 text-base-content">Loading user data...</p>
      </div>
    );
  }

  if (isError) {
    console.error("User Management Fetch Error:", error);
    return (
      <div className="text-center py-10 text-error">
        <h3 className="text-2xl font-semibold">Error Loading Users</h3>
        <p>
          Could not fetch user data. Please check the network and console for
          details.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-base-content">
        User Management ({users.length} Users)
      </h2>

      <div className="overflow-x-auto bg-base-200 rounded-lg shadow-xl">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr className="bg-base-300 text-base-content/80">
              <th>#</th>
              <th>User Details</th>
              <th>Role</th>
              <th>Created At</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-base-100">
                <th>{index + 1}</th>

                {/* User Details (Image, Name, Email) */}
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.photoURL}
                          alt={`${user.displayName} avatar`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {user.displayName || "N/A"}
                      </div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td>
                  <span
                    className={`badge badge-lg font-bold capitalize 
                                            ${
                                              user.role === "admin"
                                                ? "badge-error"
                                                : user.role === "tutor"
                                                ? "badge-warning"
                                                : "badge-success"
                                            }`}
                  >
                    {user.role || "student"}
                  </span>
                </td>

                {/* Created At */}
                <td>
                  {user.createdAt
                    ? format(new Date(user.createdAt), "MMM dd, yyyy")
                    : "N/A"}
                </td>

                {/* Actions Buttons */}
                <td className="text-center">
                  <div className="flex justify-center space-x-2">
                    {/* 1. View Profile Button */}
                    <button
                      // onClick={() => handleView(user._id)}
                      className="btn btn-ghost btn-sm tooltip"
                      data-tip="View Profile"
                    >
                      <FaEye className="text-info" />
                    </button>

                    {/* 2. Update Info Button */}
                    <button
                      // onClick={() => handleEdit(user._id)}
                      className="btn btn-ghost btn-sm tooltip"
                      data-tip="Edit Details"
                    >
                      <FaEdit className="text-primary" />
                    </button>

                    {/* 3. Modify Role Button */}
                    <button
                      // onClick={() => handleUpdateRole(user)}
                      className="btn btn-ghost btn-sm tooltip"
                      data-tip="Change Role"
                    >
                      <FaUserTag className="text-warning" />
                    </button>

                    {/* 4. Delete Account Button */}
                    <button
                      // onClick={() => handleDelete(user._id)}
                      className="btn btn-ghost btn-sm tooltip"
                      data-tip="Delete Account"
                    >
                      <FaTrashAlt className="text-error" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Optional: Add a button or summary below the table */}
      {users.length === 0 && (
        <p className="text-center py-8 text-base-content/70">
          No users found in the database.
        </p>
      )}
    </div>
  );
};

export default UserManagement;
