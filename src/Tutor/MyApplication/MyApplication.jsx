import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBookOpen,
} from "react-icons/fa";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/application/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            My Application History
          </h2>
          <p className="text-gray-500 mt-1">
            Review the status of tuition jobs you have applied for.
          </p>
        </div>
        <div className="stats shadow bg-primary text-primary-content">
          <div className="stat py-2 px-4">
            <div className="stat-title text-primary-content/70">
              Total Applied
            </div>
            <div className="stat-value text-2xl">{applications.length}</div>
          </div>
        </div>
      </div>

      <div className="bg-base-100 shadow-xl rounded-2xl border border-base-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200/50">
              <tr>
                <th className="py-4">Tuition Details</th>
                <th>Expected Salary</th>
                <th>Applied Date</th>
                <th>Current Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-base-200/30 transition-colors"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-lg text-xl">
                        <FaBookOpen />
                      </div>
                      <div>
                        <div className="font-bold text-lg">
                          {app.tuitionTitle}
                        </div>
                        <div className="text-xs opacity-60">
                          Student: {app.studentEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-bold text-success">
                      {app.expectedSalary} BDT
                    </span>
                  </td>
                  <td className="text-sm">
                    {new Date(app.appliedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    {app.status === "pending" && (
                      <span className="badge badge-warning py-3 px-4 gap-2 font-medium">
                        <FaClock className="animate-pulse" /> Pending
                      </span>
                    )}
                    {app.status === "approved" && (
                      <span className="badge badge-success py-3 px-4 gap-2 text-white font-medium">
                        <FaCheckCircle /> Approved
                      </span>
                    )}
                    {app.status === "rejected" && (
                      <span className="badge badge-error py-3 px-4 gap-2 text-white font-medium">
                        <FaTimesCircle /> Rejected
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {applications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-base-100">
            <div className="text-6xl text-base-200 mb-4">📂</div>
            <p className="text-xl font-medium text-gray-400">
              No applications found.
            </p>
            <p className="text-gray-400">
              Apply for tuitions to see them listed here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
