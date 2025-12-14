import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaTrash,
  FaEdit,
  FaClock,
  FaUserClock,
  FaMapMarkerAlt,
  FaDollarSign,
} from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: tuitions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myTuitions", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/tuitions?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const STATUS_BADGE_MAP = {
    approved: "badge-success text-success-content",
    confirmed: "badge-primary text-primary-content",
    applied: "badge-info text-info-content",
    pending: "badge-warning text-warning-content",
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
    // Example: navigate(`/dashboard/edit-tuition/${id}`);
    console.log("Edit action initiated for ID:", id);
  };

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
              className="card bg-base-200 shadow-xl border-t-4 border-primary hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-body p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="card-title text-2xl font-heading text-primary wrap-break-words">
                    {tuition.subject} ({tuition.classLevel})
                  </h2>
                  <div
                    className={`badge ${getStatusBadge(
                      tuition.status
                    )} font-semibold shadow-md`}
                  >
                    {tuition.status?.toUpperCase()}
                  </div>
                </div>

                <div className="space-y-2 text-base-content text-sm">
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
                </div>

                <p className="text-sm opacity-80 mt-4 h-12 overflow-hidden text-ellipsis">
                  <strong className="font-black">Details:</strong>{" "}
                  {tuition.description.substring(0, 100)}...
                </p>

                <div className="card-actions justify-end mt-4 pt-4 border-t border-base-300 gap-3">
                  <button
                    onClick={() => handleEdit(tuition._id)}
                    className="btn btn-sm btn-outline btn-primary text-primary"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tuition._id)}
                    className="btn btn-sm btn-outline btn-error text-error"
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
