import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../shared/Components/LoadingSpinner/LoadingSpinner";
import { FaWallet, FaArrowUp, FaFileInvoiceDollar, FaRegCreditCard } from "react-icons/fa";

const TutorRevenue = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: revenueData, isLoading, isError } = useQuery({
        queryKey: ["tutorRevenue", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get("/tutor-revenue");
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <LoadingSpinner />;

    if (isError) return <div className="p-10 text-error">Error: Could not connect to the revenue API. Check if the backend route is defined.</div>;

    const transactions = revenueData?.transactions || [];
    const totalEarnings = revenueData?.totalEarnings || 0;

    return (
        <div className="py-8 px-4">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-indigo-600 text-white rounded-lg shadow-lg">
                    <FaWallet className="text-2xl" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Revenue History</h1>
                    <p className="text-gray-500">View your total earnings and payment records</p>
                </div>
            </div>

            <div className="stats shadow bg-indigo-600 text-white w-full lg:w-1/3 mb-10">
                <div className="stat">
                    <div className="stat-figure text-white opacity-80">
                        <FaArrowUp className="text-3xl" />
                    </div>
                    <div className="stat-title text-indigo-100">Total Revenue</div>
                    <div className="stat-value">{totalEarnings.toLocaleString()} BDT</div>
                    <div className="stat-desc text-indigo-100">From {transactions.length} successful payments</div>
                </div>
            </div>

            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaFileInvoiceDollar className="text-gray-400" />
                Transaction Log
            </h3>

            {transactions.length === 0 ? (
                <div className="text-center py-20 bg-base-200 rounded-3xl border-2 border-dashed border-gray-300">
                    <FaRegCreditCard className="mx-auto text-5xl text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600">No earnings found</h3>
                    <p className="text-gray-400">Payments will appear here once students hire you.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-xl shadow-md border border-base-200">
                    <table className="table w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th>#</th>
                                <th>Subject</th>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-indigo-50 transition-colors">
                                    <th>{index + 1}</th>
                                    <td>
                                        <span className="font-bold text-indigo-700 uppercase text-xs">
                                            {payment.tuitionTitle}
                                        </span>
                                    </td>
                                    <td>
                                        <code className="text-xs font-mono text-gray-500">
                                            {payment.transactionId}
                                        </code>
                                    </td>
                                    <td className="text-sm">
                                        {new Date(payment.date).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <span className="badge badge-success badge-sm text-white">
                                            {payment.paymentStatus?.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="font-bold text-green-600">
                                        +{payment.amount} BDT
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TutorRevenue;