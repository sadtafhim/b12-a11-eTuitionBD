import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../hooks/useAxiosSecure";

import {
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaGraduationCap,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

import ApplyModal from "../ApplyModal/ApplyModal";

const AllTuition = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedTuition, setSelectedTuition] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(6);

  const [filterClass, setFilterClass] = useState("");

  const [filterSubject, setFilterSubject] = useState("");

  const [filterLocation, setFilterLocation] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["availableTuitions", currentPage, itemsPerPage],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tuitions?page=${currentPage}&size=${itemsPerPage}`
      );

      return res.data;
    },
  });

  const rawTuitions = data?.result || [];

  const totalCount = data?.totalCount || 0;

  const filteredTuitions = rawTuitions.filter((post) => {
    const matchesClass = post.classLevel

      ?.toLowerCase()

      .includes(filterClass.toLowerCase());

    const matchesSubject = post.subject

      ?.toLowerCase()

      .includes(filterSubject.toLowerCase());

    const matchesLocation =
      post.district?.toLowerCase().includes(filterLocation.toLowerCase()) ||
      post.division?.toLowerCase().includes(filterLocation.toLowerCase());

    return matchesClass && matchesSubject && matchesLocation;
  });

  const numberOfPages = Math.ceil(totalCount / itemsPerPage);

  const pages = [...Array(numberOfPages).keys()];

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <span className="loading loading-ring loading-lg text-primary"></span>

        <p className="font-medium text-gray-500">Loading opportunities...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-gray-800 mb-2">
          All Available Tuitions
        </h2>

        <p className="text-gray-500">
          Find the perfect teaching opportunity near you
        </p>
      </div>

      <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 mb-10">
        <div className="flex items-center gap-2 mb-4 text-primary font-bold">
          <FaFilter /> <span>Advanced Filters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-control w-full">
            <label className="label text-xs font-bold uppercase opacity-60">
              Subject
            </label>

            <div className="relative">
              <FaSearch className="absolute left-3 top-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search Subject (e.g. Math)"
                className="input input-bordered w-full pl-10"
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label text-xs font-bold uppercase opacity-60">
              Class Level
            </label>

            <input
              type="text"
              placeholder="e.g. Class 10"
              className="input input-bordered w-full"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-xs font-bold uppercase opacity-60">
              Location
            </label>

            <input
              type="text"
              placeholder="District or Division"
              className="input input-bordered w-full"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            />
          </div>
        </div>

        {(filterSubject || filterClass || filterLocation) && (
          <button
            onClick={() => {
              setFilterSubject("");

              setFilterClass("");

              setFilterLocation("");
            }}
            className="btn btn-ghost btn-xs mt-4 text-error"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTuitions.map((post) => (
          <div
            key={post._id}
            className="card bg-base-100 shadow-xl border border-base-200 flex flex-col hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="card-body p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div className="badge badge-primary badge-outline font-bold uppercase text-[10px]">
                  {post.status}
                </div>

                <div className="text-success font-bold flex items-center gap-1">
                  <FaMoneyBillWave /> {post.budget} BDT
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-1 capitalize">
                {post.subject} Tutor
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <FaGraduationCap className="text-primary" /> {post.classLevel}
              </div>

              <div className="divider my-1"></div>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-error" />

                  <span>
                    {post.district}, {post.division}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-info" />

                  <span>{post.daysPerWeek}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-6 flex-grow">
                <p className="text-xs text-gray-600 italic line-clamp-3">
                  "{post.description}"
                </p>
              </div>

              <div className="card-actions">
                {post.hasApplied ? (
                  <button className="btn btn-success btn-block no-animation cursor-default text-white gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Already Applied
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedTuition(post)}
                    className="btn btn-primary btn-block shadow-lg shadow-primary/30"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTuitions.length === 0 && (
        <div className="text-center py-20 bg-base-200 rounded-3xl mt-10">
          <p className="text-2xl font-bold opacity-30">
            No matches found for your search.
          </p>
        </div>
      )}

      {totalCount > 0 && (
        <div className="flex flex-col items-center mt-16 space-y-4">
          <div className="join shadow-md border border-primary/20">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="join-item btn btn-md bg-base-100"
            >
              <FaChevronLeft />
            </button>

            {pages.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`join-item btn btn-md ${
                  currentPage === page
                    ? "btn-primary text-white font-bold"
                    : "bg-base-100"
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === numberOfPages - 1}
              className="join-item btn btn-md bg-base-100"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}

      {selectedTuition && (
        <ApplyModal
          tuition={selectedTuition}
          onClose={() => setSelectedTuition(null)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AllTuition;
