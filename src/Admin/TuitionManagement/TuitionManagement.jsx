import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUsers,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { format } from "date-fns";

const TuitionManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allTuitionsAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions");
      return res.data;
    },
  });

  const tuitions = data?.result || [];

  const handleUpdateStatus = async (tuition, newStatus) => {
    const action = newStatus === "approved" ? "Approve" : "Reject";

    const { isConfirmed } = await Swal.fire({
      title: `${action} Tuition Post?`,
      html: `You are about to **${action.toLowerCase()}** the tuition post for **${
        tuition.subject
      } (${tuition.classLevel})**.`,
      icon: action === "Approve" ? "warning" : "error",
      showCancelButton: true,
      confirmButtonColor: action === "Approve" ? "#10B981" : "#EF4444",
      cancelButtonColor: "#4B5563",
      confirmButtonText: `Yes, ${action} it!`,
    });

    if (isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/tuitions/${tuition._id}`, {
          status: newStatus,
        });

        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: `Tuition post has been ${newStatus}.`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          refetch();
        } else {
          Swal.fire(
            "No Change",
            `The post is already ${tuition.status}.`,
            "info"
          );
        }
      } catch (error) {
        console.error(`${action} failed:`, error);
        Swal.fire({
          title: "Error!",
          text:
            error.response?.data?.message ||
            `Failed to ${action.toLowerCase()} post.`,
          icon: "error",
        });
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <span className="badge badge-success capitalize">Approved</span>;
      case "rejected":
        return <span className="badge badge-error capitalize">Rejected</span>;
      case "pending":
        return <span className="badge badge-warning capitalize">Pending</span>;
      case "applied":
        return <span className="badge badge-info capitalize">Applied</span>;
      case "confirmed":
        return (
          <span className="badge badge-primary capitalize">Confirmed</span>
        );
      default:
        return <span className="badge badge-ghost capitalize">{status}</span>;
    }
  };

  // --- Loading and Error States ---
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-2 text-base-content">Loading tuition posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-error">
        <h3 className="text-2xl font-semibold">Error Loading Posts</h3>
        <p>
          Could not fetch tuition data. Check API configuration or network
          connection.
        </p>
      </div>
    );
  }

  // --- Data Sorting ---
  // Sort tuitions to show 'pending' posts first for high-priority admin review
  const pendingTuitions = tuitions.filter((t) => t.status === "pending");
  const nonPendingTuitions = tuitions.filter((t) => t.status !== "pending");

  // Sort non-pending by date
  nonPendingTuitions.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Combine: pending first, then others by creation date
  const sortedTuitions = [...pendingTuitions, ...nonPendingTuitions];

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-base-content flex items-center">
        <FaUsers className="mr-3 text-secondary" /> Tuition Management (
        {tuitions.length} Posts)
      </h2>

      {/* Admin Action Alert */}
      <div className="alert alert-info shadow-lg mb-6">
        <FaClock />
        <span>
          <span className="font-bold">Action Required:</span> There are{" "}
          {pendingTuitions.length} tuition posts awaiting your review.
        </span>
      </div>

      {/* Tuition Posts Table */}
      <div className="overflow-x-auto bg-base-200 rounded-lg shadow-xl">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-300 text-base-content/80">
              <th className="w-[5%]">#</th>
              <th className="w-[35%]">Tuition Overview</th>
              <th className="w-[15%]">Location & Budget</th>
              <th className="w-[15%]">Contact</th>
              <th className="w-[15%]">Current Status</th>
              <th className="w-[15%] text-center">Admin Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedTuitions.map((tuition, index) => (
              <tr key={tuition._id} className="hover:bg-base-100">
                <th>{index + 1}</th>

                {/* Tuition Overview Column (Expanded Details) */}
                <td>
                  <div className="font-bold text-lg text-primary">
                    {tuition.subject}
                  </div>
                  <div className="text-sm space-y-1">
                    <p className="flex items-center text-base-content/80">
                      <FaGraduationCap className="mr-2 text-xs opacity-70" />
                      Class/Medium: {tuition.classLevel} ({tuition.medium})
                    </p>
                    <p className="flex items-center text-base-content/80">
                      <FaCalendarAlt className="mr-2 text-xs opacity-70" />
                      Days per Week: {tuition.daysPerWeek}
                    </p>
                    <p className="italic text-xs text-base-content/60">
                      Posted:{" "}
                      {tuition.createdAt
                        ? format(new Date(tuition.createdAt), "dd MMM yy")
                        : "N/A"}
                    </p>
                  </div>
                </td>

                {/* Location & Budget Column */}
                <td>
                  <p className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-sm text-error" />
                    {tuition.division}, {tuition.district}
                  </p>
                  <p className="mt-1 flex items-center font-semibold text-success">
                    <FaDollarSign className="mr-2 text-lg" />
                    {tuition.budget}
                  </p>
                </td>

                {/* Contact Column (Assuming 'contact' object holds these) */}
                <td>
                  <div className="text-xs opacity-70 flex items-center">
                    <FaEnvelopeOpenText className="mr-1" />
                    {tuition.email || "N/A"}
                  </div>
                </td>

                {/* Status Column */}
                <td>{getStatusBadge(tuition.status)}</td>

                {/* Admin Action Column */}
                <td className="text-center">
                  <div className="flex justify-center space-x-2">
                    {tuition.status === "pending" ? (
                      <>
                        <button
                          onClick={() =>
                            handleUpdateStatus(tuition, "approved")
                          }
                          className="btn btn-success btn-sm tooltip"
                          data-tip="Approve Post"
                        >
                          <FaCheckCircle className="text-lg" />
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(tuition, "rejected")
                          }
                          className="btn btn-error btn-sm tooltip"
                          data-tip="Reject Post"
                        >
                          <FaTimesCircle className="text-lg" />
                        </button>
                      </>
                    ) : (
                      <span className="text-sm font-semibold text-base-content/60">
                        No Action Needed
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {tuitions.length === 0 && (
        <p className="text-center py-8 text-base-content/70">
          No tuition posts found in the database.
        </p>
      )}
    </div>
  );
};

export default TuitionManagement;
