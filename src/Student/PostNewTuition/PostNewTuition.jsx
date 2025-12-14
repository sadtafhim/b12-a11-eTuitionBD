import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaGraduationCap,
  FaDollarSign,
  FaClock,
  FaMapMarkerAlt,
  FaBookOpen,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Computer Science",
  "Economics",
  "Accounting",
];
const classes = [
  "Play Group",
  "Nursery",
  "KG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "SSC Candidate",
  "HSC Candidate",
  "University Admission Candidate",
  "University Level",
  "Test Prep (SAT/IELTS)",
];
const divisions = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

const districts = {
  Dhaka: [
    "Dhaka",
    "Gazipur",
    "Kishoreganj",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Tangail",
    "Faridpur",
    "Gopalganj",
    "Madaripur",
    "Rajbari",
    "Shariatpur",
  ],

  Chattogram: [
    "Chattogram",
    "Cox's Bazar",
    "Cumilla",
    "Brahmanbaria",
    "Chandpur",
    "Feni",
    "Laxmipur",
    "Noakhali",
    "Khagrachhari",
    "Rangamati",
    "Bandarban",
  ],

  Rajshahi: [
    "Rajshahi",
    "Natore",
    "Naogaon",
    "Chapainawabganj",
    "Pabna",
    "Sirajganj",
    "Bogura",
    "Joypurhat",
  ],

  Khulna: [
    "Khulna",
    "Jessore",
    "Jhenaidah",
    "Magura",
    "Narail",
    "Bagerhat",
    "Satkhira",
    "Kushtia",
    "Chuadanga",
    "Meherpur",
  ],

  Barishal: [
    "Barishal",
    "Patuakhali",
    "Pirojpur",
    "Bhola",
    "Jhalokathi",
    "Barguna",
  ],

  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],

  Rangpur: [
    "Rangpur",
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Thakurgaon",
  ],

  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
};
const daysPerWeekOptions = [
  "1 day/week",
  "2 days/week",
  "3 days/week",
  "4 days/week",
  "5 days/week",
  "6 days/week",
  "7 days/week",
];

const PostNewTuition = () => {
  const { user, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const districtByDivision = (division) => {
    const districtsOfDivision = districts[division];
    return districtsOfDivision;
  };

  const userDivision = watch("division");

  const handlePostTuition = (data) => {
    const updatedData = {
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    Swal.fire({
      title: "Proceed With Positing?",
      text: "Your tuition posting would be available to our admins for approval!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, post it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/tuitions", updatedData).then((res) => {
          Swal.fire({
            title: "Submitted",
            text: "Your Tuition Has Been Submitted",
            icon: "success",
          });
        });
        reset();
        console.log(data);
      }
    });
  };

  if (loading) {
    return <span className="loading loading-ring loading-xl"></span>;
  }

  return (
    <div className="min-h-screen bg-base-100 py-10">
      <div className="max-w-4xl mx-auto p-6 md:p-10 bg-base-200 rounded-xl shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-heading font-extrabold text-primary mb-2">
            Create New Tuition Request
          </h1>
          <p className="text-base-content opacity-70">
            Fill out the details below to publish your request and find the
            perfect tutor.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handlePostTuition)} className="space-y-6">
          <div>
            {/* email */}
            <div>
              <label className="label text-base-content font-medium flex items-center gap-2">
                <FaBookOpen className="text-sm text-accent" /> email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "email is required",
                })}
                defaultValue={user.email}
                readOnly
                className="input input-bordered w-full bg-base-100 text-base-content"
                placeholder="e.g., 5000 (BDT)"
              />
              {errors.subject && (
                <p className="text-error text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject */}
            <div>
              <label className="label text-base-content font-medium flex items-center gap-2">
                <FaBookOpen className="text-sm text-accent" /> Subject
              </label>
              <select
                {...register("subject", { required: "Subject is required" })}
                className="select select-bordered w-full bg-base-100 text-base-content"
              >
                <option value="">Select Primary Subject</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p className="text-error text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Class/Level */}
            <div>
              <label className="label text-base-content font-medium flex items-center gap-2">
                <FaGraduationCap className="text-sm text-accent" /> Class/Level
              </label>
              <select
                {...register("classLevel", {
                  required: "Class/Level is required",
                })}
                className="select select-bordered w-full bg-base-100 text-base-content"
              >
                <option value="">Select Student's Class/Level</option>
                {classes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.classLevel && (
                <p className="text-error text-sm mt-1">
                  {errors.classLevel.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Division */}
            <div>
              <label className="label text-base-content font-medium flex items-center gap-2">
                <FaMapMarkerAlt className="text-sm text-accent" /> Division
              </label>
              <select
                {...register("division", { required: "Division is required" })}
                className="select select-bordered w-full bg-base-100 text-base-content"
              >
                <option value="">Select Division</option>
                {divisions.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="text-error text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* District */}
            <div>
              <label className="label text-base-content font-medium flex items-center gap-2">
                <FaClock className="text-sm text-accent" /> District
              </label>
              <select
                {...register("district", {
                  required: "District week is required",
                })}
                className="select select-bordered w-full bg-base-100 text-base-content"
              >
                <option value="">Select District</option>
                {(districtByDivision(userDivision) || []).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.daysPerWeek && (
                <p className="text-error text-sm mt-1">
                  {errors.daysPerWeek.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Days per Week */}
            <div>
              <label className="label text-base-content font-medium flex items-center gap-2">
                <FaClock className="text-sm text-accent" /> Days/Week
              </label>
              <select
                {...register("daysPerWeek", {
                  required: "Days per week is required",
                })}
                className="select select-bordered w-full bg-base-100 text-base-content"
              >
                <option value="">How often per week?</option>
                {daysPerWeekOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.daysPerWeek && (
                <p className="text-error text-sm mt-1">
                  {errors.daysPerWeek.message}
                </p>
              )}
            </div>
            {/* Budget */}
            <div>
              <label className="label text-base-content font-medium flex items-center gap-2">
                <FaDollarSign className="text-sm text-accent" /> Monthly Budget
                (BDT)
              </label>
              <input
                type="number"
                {...register("budget", {
                  required: "Budget is required",
                  min: { value: 500, message: "Minimum budget is 500 BDT" },
                })}
                className="input input-bordered w-full bg-base-100 text-base-content"
                placeholder="e.g., 5000 (BDT)"
              />
              {errors.budget && (
                <p className="text-error text-sm mt-1">
                  {errors.budget.message}
                </p>
              )}
            </div>
          </div>

          {/*  Description */}
          <div>
            <label className="label text-base-content font-medium">
              Detailed Requirements
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 50,
                  message:
                    "Please provide a detailed description (min 50 chars)",
                },
              })}
              className="textarea textarea-bordered h-32 w-full bg-base-100 text-base-content"
              placeholder="Describe your student's learning style, specific topics needed, preferred time slots, etc."
            ></textarea>
            {errors.description && (
              <p className="text-error text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg w-full font-heading text-primary-content shadow-md mt-8 transition-transform hover:scale-[1.005]"
          >
            Post Tuition Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostNewTuition;
