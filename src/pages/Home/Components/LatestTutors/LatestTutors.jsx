import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaGraduationCap, FaStar, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import LoadingSpinner from "../../../../shared/Components/LoadingSpinner/LoadingSpinner";

const LatestTutors = () => {
    const { data: tutors = [], isLoading } = useQuery({
        queryKey: ["latestTutors"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/latest-tutors");
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <section className="bg-base-100 py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-sm font-semibold uppercase text-accent tracking-wider">
                        Verified Professionals
                    </h2>
                    <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 text-base-content">
                        Meet Our <span className="text-primary">Expert Tutors</span>
                    </h1>
                    <p className="text-base-content opacity-70 max-w-2xl mx-auto mt-4">
                        Our platform connects you with highly qualified tutors across various subjects.
                        Check out the newest experts to join our community.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {tutors.map((tutor, index) => (
                        <div
                            key={tutor._id}
                            className="card bg-base-200 shadow-xl p-8 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] group text-center"
                        >
                            <div className={`absolute top-0 left-0 w-full h-2 ${index % 2 === 0 ? 'bg-primary' : 'bg-accent'}`}></div>

                            <div
                                className={`absolute top-4 right-4 ${index % 2 === 0 ? 'text-primary' : 'text-accent'} opacity-80`}
                                title="Verified Tutor"
                            >
                                <FaCheckCircle size={20} />
                            </div>

                            <div className="flex justify-center mb-6">
                                <div className={`p-1 rounded-full border-2 ${index % 2 === 0 ? 'border-primary/30' : 'border-accent/30'} group-hover:scale-110 transition-transform duration-500`}>
                                    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-base-200">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={tutor.photoURL || "https://i.ibb.co/0Q9L0K6/user-placeholder.png"}
                                            alt={tutor.displayName}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-extrabold text-base-content mb-1 group-hover:text-primary transition-colors">
                                {tutor.displayName}
                            </h3>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-base-content opacity-50 mb-3">
                                Multi-subject Specialist
                            </p>

                            <div className="flex items-center justify-center gap-1 text-orange-400 mb-5">
                                <FaStar size={14} /> <FaStar size={14} /> <FaStar size={14} /> <FaStar size={14} /> <FaStar size={14} />
                                <span className="text-xs text-base-content opacity-40 ml-1 font-bold">(New)</span>
                            </div>

                            <div className="flex items-center justify-center gap-2 py-3 px-4 bg-base-100/50 rounded-lg mb-6">
                                <FaGraduationCap className={index % 2 === 0 ? 'text-primary' : 'text-accent'} size={18} />
                                <span className="text-xs font-bold text-base-content opacity-70 italic">Certified Tutor</span>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default LatestTutors;