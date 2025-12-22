import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../shared/Components/LoadingSpinner/LoadingSpinner";
import { FaHistory, FaReceipt, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading, isError, error } = useQuery({
        queryKey: ["payments", user?.email],
        enabled: !!user?.email, // Only run query if email exists
        queryFn: async () => {
            // Note: Check if your backend expects email as a query param or gets it from JWT
            const res = await axiosSecure.get(`/payments/history?email=${user?.email}`);
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-error">
                <FaExclamationTriangle className="text-5xl mb-4" />
                <h2 className="text-xl font-bold">Failed to load payments</h2>
                <p className="opacity-70">{error?.message || "Check console for details"}</p>
            </div>
        );
    }

    return (
        <div className="py-8 px-4 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-primary/10 text-primary rounded-2xl shadow-sm">
                        <FaHistory className="text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">Payment History</h1>
                        <p className="text-base-content/60">Verified transactions for your tutoring sessions</p>
                    </div>
                </div>
                <div className="stats shadow bg-base-200 rounded-2xl hidden md:flex">
                    <div className="stat">
                        <div className="stat-title text-xs font-bold uppercase">Total Transactions</div>
                        <div className="stat-value text-primary text-2xl">{payments.length}</div>
                    </div>
                </div>
            </header>

            {payments.length === 0 ? (
                <div className="text-center py-24 bg-base-200/50 rounded-[3rem] border-2 border-dashed border-base-300">
                    <div className="w-20 h-20 bg-base-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <FaReceipt className="text-3xl text-base-content/20" />
                    </div>
                    <h3 className="text-2xl font-bold opacity-70">No records found</h3>
                    <p className="text-base-content/40 max-w-xs mx-auto mt-2">
                        Your transaction history is empty. Once you pay for a tutor, it will appear here.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden bg-base-100 rounded-[2rem] border border-base-300 shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="table w-full border-separate border-spacing-y-2 px-4">
                            <thead>
                                <tr className="text-sm font-black uppercase tracking-widest text-base-content/40 border-none">
                                    <th className="bg-transparent">#</th>
                                    <th className="bg-transparent">Job Details</th>
                                    <th className="bg-transparent">Transaction</th>
                                    <th className="bg-transparent">Amount</th>
                                    <th className="bg-transparent">Date</th>
                                    <th className="bg-transparent text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment, index) => (
                                    <tr key={payment._id} className="group transition-all">
                                        <td className="bg-base-200 group-hover:bg-primary/5 rounded-l-2xl font-bold opacity-30">
                                            {String(index + 1).padStart(2, '0')}
                                        </td>
                                        <td className="bg-base-200 group-hover:bg-primary/5">
                                            <div className="font-black text-base-content group-hover:text-primary transition-colors">
                                                {payment.tuitionTitle || "Tuition Service"}
                                            </div>
                                            <div className="text-xs font-bold opacity-50 uppercase tracking-tighter">
                                                ID: {payment.tuitionId?.slice(-6) || "N/A"}
                                            </div>
                                        </td>
                                        <td className="bg-base-200 group-hover:bg-primary/5">
                                            <div className="badge badge-outline border-base-300 font-mono text-[10px] py-3 opacity-70">
                                                {payment.transactionId}
                                            </div>
                                        </td>
                                        <td className="bg-base-200 group-hover:bg-primary/5">
                                            <div className="flex flex-col">
                                                <span className="font-black text-lg">৳{payment.amount}</span>
                                                <span className="text-[10px] opacity-40 uppercase font-bold">Paid via Card</span>
                                            </div>
                                        </td>
                                        <td className="bg-base-200 group-hover:bg-primary/5">
                                            <div className="text-sm font-bold">
                                                {new Date(payment.date).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                            <div className="text-[10px] opacity-40 font-bold uppercase">
                                                {new Date(payment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className="bg-base-200 group-hover:bg-primary/5 rounded-r-2xl text-right">
                                            <div className="badge badge-success text-white font-black text-[10px] uppercase tracking-widest py-3 px-4 gap-2">
                                                <FaCheckCircle /> {payment.paymentStatus || 'Success'}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;