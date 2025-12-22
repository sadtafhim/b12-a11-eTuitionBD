import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
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
import LoadingSpinner from "../../shared/Components/LoadingSpinner/LoadingSpinner";
import { useNavigate, useParams } from "react-router";

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
const daysPerWeekOptions = [
  "1 day/week",
  "2 days/week",
  "3 days/week",
  "4 days/week",
  "5 days/week",
  "6 days/week",
  "7 days/week",
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
// --------------------------------------------------------------------------

const EditTuition = () => {
  const { user, loading: authLoading } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: tuitionData,
    isLoading: queryLoading,
    isError,
  } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await axiosSecure.get(`/tuitions/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const watchedDivision = watch("division");

  useEffect(() => {
    if (tuitionData) {
      reset(tuitionData);
    }
  }, [tuitionData, reset]);

  const districtByDivision = (division) => {
    const districtsOfDivision = districts[division];
    return districtsOfDivision;
  };

  // FIX: Use initial data if available, otherwise use live watch
  const activeDivision = tuitionData?.division || watchedDivision;

  const handleUpdateTuition = (data) => {
    const updatedData = {
      subject: data.subject,
      classLevel: data.classLevel,
      division: data.division,
      district: data.district,
      daysPerWeek: data.daysPerWeek,
      budget: data.budget,
      description: data.description,
    };

    Swal.fire({
      title: "Confirm Update?",
      text: "This modification will reset the status to 'pending' and require re-approval.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/tuitions/${id}`, updatedData)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Updated!",
                text: "Your Tuition Post has been updated and sent for review.",
                icon: "success",
              });
              navigate("/dashboard/my-tuitions");
            } else {
              Swal.fire({
                title: "No Changes",
                text: "No new modifications were detected.",
                icon: "info",
              });
            }
          })
          .catch((error) => {
            Swal.fire(
              "Error",
              "Failed to update tuition. Check network or server logs.",
              "error"
            );
          });
      }
    });
  };

  if (authLoading || queryLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !tuitionData) {
    return (
      <div className="text-center py-20 text-error">
        <h2 className="text-2xl">
          Error loading tuition data. Please check the ID or network connection.
        </h2>
        <button
          onClick={() => navigate("/dashboard/my-tuitions")}
          className="btn btn-primary mt-4"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-10">
      <div className="max-w-4xl mx-auto p-6 md:p-10 bg-base-200 rounded-xl shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-heading font-extrabold text-primary mb-2">
            Edit Tuition Request
          </h1>
          <p className="text-base-content opacity-70">
            Modify the details for tuition ID: **{id}**.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleUpdateTuition)}
          className="space-y-6"
        >
          {/* Email field (Read Only) */}
          <div>
            <label className="label text-base-content font-medium flex items-center gap-2">
              <FaBookOpen className="text-sm text-accent" /> Email
            </label>
            <input
              type="email"
              {...register("email")}
              defaultValue={user.email}
              readOnly
              className="input input-bordered w-full bg-base-100 text-base-content"
            />
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
              {errors.division && (
                <p className="text-error text-sm mt-1">
                  {errors.division.message}
                </p>
              )}
            </div>

            {/* District (Uses activeDivision for dynamic options) */}
            <div>
              <label className="label text-base-content font-medium flex items-center gap-2">
                <FaMapMarkerAlt className="text-sm text-accent" /> District
              </label>
              <select
                {...register("district", {
                  required: "District is required",
                })}
                className="select select-bordered w-full bg-base-100 text-base-content"
              >
                <option value="">Select District</option>
                {/* Use the calculated activeDivision to render options */}
                {(districtByDivision(activeDivision) || []).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-error text-sm mt-1">
                  {errors.district.message}
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

          {/* Detailed Requirements */}
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
            className="btn btn-warning btn-lg w-full font-heading text-primary-content shadow-md mt-8 transition-transform hover:scale-[1.005]"
          >
            Update Tuition Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTuition;
