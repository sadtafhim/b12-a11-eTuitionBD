import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaEdit, FaUserTag, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { format } from "date-fns";
import EditUserModal from "../EditUserModal/EditUserModal";
import UserProfileModal from "../UserProfileModal/UserProfileModal";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userIdToView, setUserIdToView] = useState(null);

  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // --- Edit Modal Handlers ---
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  // --- View Modal Handlers ---
  const handleView = (userId) => {
    setUserIdToView(userId);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setUserIdToView(null);
  };

  const handleUpdateRole = async (user) => {
    const { value: newRole } = await Swal.fire({
      title: `Change Role for ${user.displayName || user.email}`,
      input: "select",
      inputOptions: {
        student: "Student",
        tutor: "Tutor",
        admin: "Admin",
      },
      inputValue: user.role,
      inputPlaceholder: "Select a new role",
      showCancelButton: true,
      confirmButtonText: "Confirm Change",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select a role!";
        }
        if (value === user.role) {
          return "The role is already set to this value.";
        }
      },
    });

    if (newRole) {
      try {
        const payload = { role: newRole };
        const res = await axiosSecure.patch(`/users/${user._id}`, payload);

        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: `${user.displayName}'s role has been updated to ${newRole}.`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          refetch();
        } else {
          Swal.fire(
            "No Change",
            "The role update request was sent but no change was recorded.",
            "info"
          );
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text:
            error.response?.data?.message ||
            "Failed to update role. Check admin permissions.",
          icon: "error",
        });
      }
    }
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to permanently delete the account for ${user.displayName || user.email
        }. This action is irreversible.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/users/${user._id}`);

          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "The user account has been successfully removed.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            refetch();
          } else {
            Swal.fire("Error", "Could not delete the user account.", "error");
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text:
              error.response?.data?.message ||
              "Failed to delete user. Check network and permissions.",
            icon: "error",
          });
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-2 text-base-content">Loading user data...</p>
      </div>
    );
  }

  if (isError) {
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
          <thead>
            <tr className="bg-base-300 text-base-content/80">
              <th>#</th>
              <th>User Details</th>
              <th>Role</th>
              <th>Created At</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-base-100">
                <th>{index + 1}</th>

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

                <td>
                  <span
                    className={`badge badge-lg font-bold capitalize 
                                            ${user.role === "admin"
                        ? "badge-error"
                        : user.role === "tutor"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                  >
                    {user.role || "student"}
                  </span>
                </td>

                <td>
                  {user.createdAt
                    ? format(new Date(user.createdAt), "MMM dd, yyyy")
                    : "N/A"}
                </td>

                <td className="text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleView(user._id)}
                      className="btn btn-ghost btn-sm tooltip"
                      data-tip="View Profile"
                    >
                      <FaEye className="text-info" />
                    </button>

                    <button
                      onClick={() => handleEdit(user)}
                      className="btn btn-ghost btn-sm tooltip"
                      data-tip="Edit Details"
                    >
                      <FaEdit className="text-primary" />
                    </button>

                    <button
                      onClick={() => handleUpdateRole(user)}
                      className="btn btn-ghost btn-sm tooltip"
                      data-tip="Change Role"
                    >
                      <FaUserTag className="text-warning" />
                    </button>

                    <button
                      onClick={() => handleDelete(user)}
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

      {users.length === 0 && (
        <p className="text-center py-8 text-base-content/70">
          No users found in the database.
        </p>
      )}

      {isEditModalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={closeEditModal}
          refetchUsers={refetch}
        />
      )}

      {isViewModalOpen && userIdToView && (
        <UserProfileModal userId={userIdToView} onClose={closeViewModal} />
      )}
    </div>
  );
};

export default UserManagement;
