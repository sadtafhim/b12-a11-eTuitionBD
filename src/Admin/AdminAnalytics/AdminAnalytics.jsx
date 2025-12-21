import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../shared/Components/LoadingSpinner/LoadingSpinner";
import { FaChartLine, FaMoneyBillWave, FaExchangeAlt, FaFileDownload } from "react-icons/fa";

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="py-8 px-6 bg-base-200 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-500">Comprehensive overview of platform financial performance</p>
        </div>
        <button className="btn btn-primary gap-2">
          <FaFileDownload /> Export Report
        </button>
      </div>

      {/* --- Stats Overview --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="stat bg-white shadow-md rounded-2xl p-6">
          <div className="stat-figure text-primary">
            <FaMoneyBillWave className="text-4xl" />
          </div>
          <div className="stat-title font-medium text-gray-500">Total Revenue</div>
          <div className="stat-value text-primary">{stats?.totalRevenue?.toLocaleString()} BDT</div>
          <div className="stat-desc text-success font-bold mt-1">↑ 12% from last month</div>
        </div>

        <div className="stat bg-white shadow-md rounded-2xl p-6">
          <div className="stat-figure text-secondary">
            <FaExchangeAlt className="text-4xl" />
          </div>
          <div className="stat-title font-medium text-gray-500">Total Transactions</div>
          <div className="stat-value text-secondary">{stats?.totalTransactions}</div>
          <div className="stat-desc text-gray-400">Successful payments processed</div>
        </div>

        <div className="stat bg-white shadow-md rounded-2xl p-6">
          <div className="stat-figure text-accent">
            <FaChartLine className="text-4xl" />
          </div>
          <div className="stat-title font-medium text-gray-500">Avg. Transaction</div>
          <div className="stat-value text-accent">
            {stats?.totalTransactions > 0
              ? (stats.totalRevenue / stats.totalTransactions).toFixed(0)
              : 0} BDT
          </div>
          <div className="stat-desc text-gray-400">Platform fee per hire</div>
        </div>
      </div>

      {/* --- Detailed Transaction History --- */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-700">Recent Transactions</h3>
          <div className="badge badge-outline badge-ghost">{stats?.allPayments?.length} Total Records</div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-gray-600">Date</th>
                <th className="text-gray-600">Student (Payer)</th>
                <th className="text-gray-600">Tutor (Receiver)</th>
                <th className="text-gray-600">Transaction ID</th>
                <th className="text-gray-600 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {stats?.allPayments?.map((payment) => (
                <tr key={payment._id} className="hover:bg-blue-50/30">
                  <td className="text-sm">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="font-medium text-gray-700">{payment.studentEmail}</div>
                    <div className="text-xs text-primary italic">{payment.tuitionTitle}</div>
                  </td>
                  <td className="text-sm text-gray-600">{payment.tutorEmail}</td>
                  <td>
                    <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                      {payment.transactionId}
                    </code>
                  </td>
                  <td className="text-right font-bold text-success">
                    {payment.amount} BDT
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;