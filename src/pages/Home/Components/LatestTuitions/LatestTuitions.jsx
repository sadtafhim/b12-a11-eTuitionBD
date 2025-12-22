import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaMapMarkerAlt, FaBookOpen, FaMoneyBillWave, FaArrowRight, FaCalendarAlt, FaClock } from "react-icons/fa";
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
        <section className="bg-base-100 py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-sm font-semibold uppercase text-accent tracking-wider">
                        Available Opportunities
                    </h2>
                    <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 text-base-content">
                        Latest Tuition Posts
                    </h1>
                    <p className="text-base-content opacity-70 max-w-2xl mx-auto mt-4">
                        Discover the newest tutoring requests. Filter by subject, location, and budget to find your perfect student.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {tuitions.map((post, index) => (
                        <div
                            key={post._id}
                            className="card bg-base-200 shadow-xl p-7 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] group flex flex-col h-full"
                        >

                            <div className={`absolute top-0 left-0 w-full h-2 ${index % 2 === 0 ? 'bg-primary' : 'bg-accent'}`}></div>

                            <div className="flex justify-between items-start mb-5">
                                <span className={`badge border-none font-bold py-3 px-4 ${index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                                    {post.classLevel || "General"}
                                </span>
                                <div className="flex items-center gap-1 text-xs text-base-content opacity-50 font-medium">
                                    <FaCalendarAlt size={12} />
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <h3 className="text-2xl font-extrabold text-base-content mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                Need {post.subject} Tutor
                            </h3>

                            <p className="text-sm text-base-content opacity-60 line-clamp-2 mb-6 italic">
                                "{post.description}"
                            </p>

                            <div className="space-y-4 mb-8 grow">
                                <div className="flex items-center gap-3 text-base-content">
                                    <div className={`p-2 rounded-lg ${index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                                        <FaMapMarkerAlt size={14} />
                                    </div>
                                    <span className="text-sm font-medium">
                                        {post.district}, {post.division}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 text-base-content">
                                    <div className={`p-2 rounded-lg ${index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                                        <FaClock size={14} />
                                    </div>
                                    <span className="text-sm opacity-80">{post.daysPerWeek}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-success/10 text-success">
                                        <FaMoneyBillWave size={14} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold opacity-50 leading-none">Monthly Budget</span>
                                        <span className="font-extrabold text-xl text-base-content">
                                            {post.budget} <span className="text-xs font-normal opacity-60">BDT</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default LatestTuitions;