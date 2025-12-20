import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../shared/Components/LoadingSpinner/LoadingSpinner";
import {
    FaChalkboardTeacher,
    FaCalendarCheck,
    FaEnvelope,
    FaUser,
} from "react-icons/fa";

const OngoingTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: ongoing = [], isLoading } = useQuery({
        queryKey: ["ongoingTuitions", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get("/tutor-ongoing-tuitions");
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="py-8 px-4">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-success text-white rounded-lg shadow-lg">
                    <FaChalkboardTeacher className="text-2xl" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Ongoing Tuitions</h1>
                    <p className="text-gray-500">
                        Your currently active teaching assignments
                    </p>
                </div>
            </div>

            {ongoing.length === 0 ? (
                <div className="text-center py-20 bg-base-200 rounded-3xl border-2 border-dashed border-gray-300">
                    <FaCalendarCheck className="mx-auto text-5xl text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600">
                        No ongoing tuitions
                    </h3>
                    <p className="text-gray-400">
                        Apply for more tuitions to see them here once accepted by students.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ongoing.map((item) => (
                        <div
                            key={item._id}
                            className="card bg-base-100 shadow-xl border-l-8 border-success"
                        >
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <h2 className="card-title text-primary uppercase text-lg">
                                        {item.tuitionTitle}
                                    </h2>
                                    <div className="badge badge-success text-white">ACTIVE</div>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaUser className="text-gray-400" />
                                        <span className="font-semibold">Student:</span>{" "}
                                        {item.studentName}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaEnvelope className="text-gray-400" />
                                        <span>{item.studentEmail}</span>
                                    </div>
                                    <div className="p-3 bg-green-50 rounded-lg">
                                        <p className="text-xs text-green-600 font-bold uppercase">
                                            Monthly Salary
                                        </p>
                                        <p className="text-xl font-bold text-green-800">
                                            {item.expectedSalary} BDT
                                        </p>
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

export default OngoingTuitions;
