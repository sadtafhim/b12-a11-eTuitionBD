import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../shared/Components/LoadingSpinner/LoadingSpinner";
import { FaHistory, FaReceipt, FaCheckCircle } from "react-icons/fa";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get("/payments/history");
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="py-8 px-4">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary text-white rounded-lg shadow-lg">
                    <FaHistory className="text-2xl" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Payment History</h1>
                    <p className="text-gray-500">Track all your tutor hiring transactions</p>
                </div>
            </div>

            {payments.length === 0 ? (
                <div className="text-center py-20 bg-base-200 rounded-3xl border-2 border-dashed border-gray-300">
                    <FaReceipt className="mx-auto text-5xl text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600">No payments found</h3>
                    <p className="text-gray-400">Your transaction records will appear here after you hire a tutor.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-xl shadow-md border border-base-200">
                    <table className="table table-zebra w-full">
                        <thead className="bg-base-200">
                            <tr className="text-sm">
                                <th>#</th>
                                <th>Tuition / Tutor</th>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-blue-50 transition-colors">
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="font-bold text-primary uppercase text-xs">
                                            {payment.tuitionTitle || "Tuition Job"}
                                        </div>
                                        <div className="text-sm opacity-70">Tutor: {payment.tutorEmail}</div>
                                    </td>
                                    <td>
                                        <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                                            {payment.transactionId}
                                        </code>
                                    </td>
                                    <td className="font-bold text-lg">
                                        {payment.amount} <span className="text-xs">BDT</span>
                                    </td>
                                    <td className="text-sm">
                                        {new Date(payment.date).toLocaleDateString()}
                                        <br />
                                        <span className="text-xs opacity-50">
                                            {new Date(payment.date).toLocaleTimeString()}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="badge badge-success gap-2 text-white font-medium p-3">
                                            <FaCheckCircle className="text-[10px]" />
                                            {payment.paymentStatus?.toUpperCase()}
                                        </div>
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

export default PaymentHistory;