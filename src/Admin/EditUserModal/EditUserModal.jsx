import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EditUserModal = ({ user, onClose, refetchUsers }) => {
  const axiosSecure = useAxiosSecure();

  console.log(user);

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
    role: user?.role || "student",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        role: user.role || "student",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      displayName: formData.displayName,
      photoURL: formData.photoURL,
      role: formData.role,
    };

    try {
      const res = await axiosSecure.patch(`/users/${user._id}`, payload);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "User information has been updated successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        refetchUsers();
        onClose();
      } else {
        Swal.fire({
          title: "No Changes",
          text: "User data was submitted but no modifications were made.",
          icon: "info",
        });
      }
    } catch (error) {
      console.error("User update failed:", error);
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to update user. Check console for details.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <dialog id="edit_user_modal" className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-2xl text-primary mb-4">
          Edit User: {user.displayName}
        </h3>
        <p className="text-sm text-base-content/70 mb-4">Email: {user.email}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Display Name</span>
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">
                Profile Image URL
              </span>
            </label>
            <input
              type="url"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Modify Role</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditUserModal;
