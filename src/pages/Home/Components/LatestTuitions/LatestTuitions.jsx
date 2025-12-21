import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaMapMarkerAlt, FaBookOpen, FaMoneyBillWave, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import LoadingSpinner from "../../../../shared/Components/LoadingSpinner/LoadingSpinner";

const LatestTuitions = () => {
    const { data: tuitions = [], isLoading } = useQuery({
        queryKey: ["latestTuitions"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/latest-tuitions");
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Latest Tuition Posts</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Explore the most recent opportunities. Find the perfect student and start your teaching journey today.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tuitions.map((post) => (
                        <div key={post._id} className="card bg-white shadow-xl hover:shadow-2xl transition-shadow border border-gray-100">
                            <div className="card-body p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="badge badge-primary badge-outline font-semibold">
                                        {post.classCategory || "General"}
                                    </span>
                                    <span className="text-xs text-gray-400 font-medium">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                                    {post.tuitionTitle}
                                </h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <FaBookOpen className="text-primary" />
                                        <span>Subject: <span className="font-medium text-gray-800">{post.subject}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <FaMapMarkerAlt className="text-primary" />
                                        <span>{post.location || "Remote / Online"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <FaMoneyBillWave className="text-success" />
                                        <span className="font-bold text-lg text-gray-800">{post.salary} BDT</span>
                                    </div>
                                </div>

                                <div className="card-actions mt-auto">
                                    <Link to={`/tuition/${post._id}`} className="btn btn-primary btn-block gap-2">
                                        View Details <FaArrowRight className="text-xs" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/all-tuitions" className="btn btn-outline btn-primary px-10 rounded-full border-2">
                        Browse All Posts
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestTuitions;