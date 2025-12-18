import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaTrash,
  FaEdit,
  FaClock,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import LoadingSpinner from "../../shared/Components/LoadingSpinner/LoadingSpinner";

const MyTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["myTuitions", user?.email],
    queryFn: async () => {
      if (!user?.email) return { result: [], totalCount: 0 };
      const res = await axiosSecure.get(`/tuitions?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const tuitions = data?.result || [];

  const STATUS_BADGE_MAP = {
    approved: "badge-success text-success-content",
    confirmed: "badge-primary text-primary-content",
    applied: "badge-info text-info-content",
    pending: "badge-warning text-warning-content",
    rejected: "badge-error text-error-content",
  };

  const getStatusBadge = (status) =>
    STATUS_BADGE_MAP[status?.toLowerCase()] || "badge-ghost";

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tuitions/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your post has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-tuition/${id}`);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner />
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
            to="/dashboard/post-new-tuition"
            className="btn btn-sm btn-primary"
          >
            Post Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tuitions.map((tuition) => (
            <div
              key={tuition._id}
              className="card bg-base-100 shadow-xl border-t-4 border-primary hover:shadow-2xl transition-all duration-300"
            >
              <div className="card-body p-6">
                <div className="flex justify-between items-start mb-4 gap-2">
                  <h2 className="card-title text-xl font-heading text-primary wrap-break-words leading-tight">
                    {tuition.subject} ({tuition.classLevel})
                  </h2>
                  <div
                    className={`badge ${getStatusBadge(
                      tuition.status
                    )} font-semibold shadow-sm text-[10px] py-3`}
                  >
                    {tuition.status?.toUpperCase()}
                  </div>
                </div>

                <div className="space-y-2 text-base-content text-sm">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-accent" />
                    <span>{tuition.district}, {tuition.division}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaDollarSign className="text-accent" />
                    <span>{tuition.budget} BDT/month</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-accent" />
                    <span>{tuition.daysPerWeek}</span>
                  </p>
                </div>

                <p className="text-xs opacity-70 mt-4 h-10 overflow-hidden text-ellipsis">
                  <span className="font-bold">Details:</span>{" "}
                  {tuition.description.substring(0, 80)}...
                </p>

                <div className="mt-6 pt-4 border-t border-base-200">
                  {tuition.status !== "pending" && tuition.status !== "rejected" && (
                    <button
                      onClick={() => navigate(`/dashboard/applied-tutors/${tuition._id}`)}
                      className="btn btn-primary btn-outline btn-block btn-sm mb-3 gap-2"
                    >
                      <FaUsers /> View Applicants
                    </button>
                  )}

                  <div className="flex justify-between gap-2">
                    <button
                      disabled={tuition.status === "confirmed"}
                      onClick={() => handleEdit(tuition._id)}
                      className="btn btn-sm btn-ghost bg-base-200 flex-1 gap-2"
                    >
                      <FaEdit /> Edit
                    </button>

                    <button
                      disabled={tuition.status === "confirmed"}
                      onClick={() => handleDelete(tuition._id)}
                      className="btn btn-sm btn-ghost bg-red-50 text-error hover:bg-red-100 flex-1 gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
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