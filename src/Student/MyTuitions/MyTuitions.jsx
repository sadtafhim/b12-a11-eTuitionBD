import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaClock,
  FaUserClock,
  FaMapMarkerAlt,
  FaDollarSign,
} from "react-icons/fa";

const MyTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1. Fetch data using React Query
  const {
    data: tuitions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myTuitions", user?.email],
    queryFn: async () => {
      // Ensure user.email exists before calling API
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/tuitions?email=${user.email}`);
      return res.data;
    },
    // Only run the query if user.email is available
    enabled: !!user?.email,
  });

  // --- Placeholder Logic for Status ---
  // Mocks the status field for visual implementation, as it's required
  // but missing in the provided sample data structure.
  const tuitionsWithStatus = tuitions.map((t, index) => ({
    ...t,
    // Cycle through statuses for demonstration
    status:
      index % 4 === 0
        ? "Approved"
        : index % 4 === 1
        ? "Confirmed"
        : index % 4 === 2
        ? "Applied"
        : "Pending",
  }));

  // Helper function to map status to DaisyUI badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "badge-success text-success-content"; // Ready to start
      case "Confirmed":
        return "badge-primary text-primary-content"; // Tutor confirmed
      case "Applied":
        return "badge-info text-info-content"; // Tutors have applied
      case "Pending":
        return "badge-warning text-warning-content"; // Awaiting admin review
      default:
        return "badge-ghost";
    }
  };

  // --- Placeholder Action Handlers ---
  const handleDelete = (id) => {
    // 1. Implement API call to delete tuition post
    console.log("Delete action initiated for ID:", id);
    // After successful deletion, call refetch() to update the list
  };

  const handleEdit = (id) => {
    // 1. Implement navigation to an edit form (e.g., /dashboard/edit-tuition/${id})
    console.log("Edit action initiated for ID:", id);
  };
  // ------------------------------------

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-heading font-bold text-base-content mb-8">
        Your Posted Tuitions ({tuitions.length})
      </h1>

      {tuitions.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <FaClock />
          <span>You have not posted any tuition requests yet.</span>
          <Link
            to="/dashboard/post-new-tution"
            className="btn btn-sm btn-primary"
          >
            Post Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tuitionsWithStatus.map((tuition) => (
            <div
              key={tuition._id}
              className="card bg-base-200 shadow-xl border-t-4 border-primary hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-body p-6">
                {/* Header and Status */}
                <div className="flex justify-between items-start mb-4">
                  <h2 className="card-title text-2xl font-heading text-color-primary wrap-break-words">
                    {tuition.subject} ({tuition.classLevel})
                  </h2>
                  <div
                    className={`badge ${getStatusBadge(
                      tuition.status
                    )} font-semibold shadow-md`}
                  >
                    {tuition.status.toUpperCase()}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="space-y-2 text-color-base-content text-sm">
                  <p>
                    <strong>
                      <FaMapMarkerAlt className="inline mr-2 text-accent" />
                      Location:
                    </strong>{" "}
                    {tuition.district}, {tuition.division}
                  </p>
                  <p>
                    <strong>
                      <FaDollarSign className="inline mr-2 text-accent" />
                      Budget:
                    </strong>{" "}
                    {tuition.budget} BDT/month
                  </p>
                  <p>
                    <strong>
                      <FaClock className="inline mr-2 text-accent" />
                      Frequency:
                    </strong>{" "}
                    {tuition.daysPerWeek}
                  </p>
                  <p>
                    <strong>
                      <FaUserClock className="inline mr-2 text-accent" />
                      Status:
                    </strong>{" "}
                    {tuition.status}
                  </p>
                </div>

                {/* Description (Optional, condensed) */}
                <p className="text-sm opacity-80 mt-4 h-12 overflow-hidden text-ellipsis">
                  **Details:** {tuition.description.substring(0, 100)}...
                </p>

                {/* Actions */}
                <div className="card-actions justify-end mt-4 pt-4 border-t border-[--color-base-300] gap-3">
                  <button
                    onClick={() => handleEdit(tuition._id)}
                    className="btn btn-sm btn-outline btn-primary text-color-primary"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tuition._id)}
                    className="btn btn-sm btn-outline btn-error text-color-error"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTuitions;
