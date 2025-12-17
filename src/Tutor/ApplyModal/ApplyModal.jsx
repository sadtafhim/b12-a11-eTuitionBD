import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApplyModal = ({ tuition, onClose }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // Constructing the payload with tutor's basic info + form data
    const applicationPayload = {
      tuitionId: tuition._id,
      tuitionTitle: tuition.subject, // Using subject as title
      studentEmail: tuition.email,

      // Tutor Info from Firebase
      tutorName: user?.displayName || "Anonymous Tutor",
      tutorEmail: user?.email,
      tutorPhoto: user?.photoURL || "https://i.ibb.co/5GV907X/avatar.png",

      // Form fields
      qualifications: data.qualifications,
      experience: data.experience,
      expectedSalary: data.expectedSalary,

      status: "pending",
      appliedAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/applications", applicationPayload);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "The student has been notified.",
          timer: 2000,
          showConfirmButton: false,
        });
        onClose();
      }
    } catch (error) {
      Swal.fire("Error", "Could not submit application.", "error");
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        {/* Tutor Preview in Modal */}
        <div className="flex items-center gap-4 mb-6 p-3 bg-base-200 rounded-lg">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user?.photoURL || "https://i.ibb.co/5GV907X/avatar.png"}
                alt="Tutor"
              />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm">Applying as:</h4>
            <p className="text-primary font-medium">{user?.displayName}</p>
          </div>
        </div>

        <h3 className="font-bold text-lg mb-4">
          Applying for {tuition.subject} ({tuition.classLevel})
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label text-xs font-bold uppercase opacity-60">
              Qualifications
            </label>
            <input
              {...register("qualifications", { required: true })}
              placeholder="e.g. B.Sc in Math"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label text-xs font-bold uppercase opacity-60">
              Experience
            </label>
            <input
              {...register("experience", { required: true })}
              placeholder="e.g. 2 years"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label text-xs font-bold uppercase opacity-60">
              Expected Salary
            </label>
            <input
              type="number"
              {...register("expectedSalary", { required: true })}
              placeholder="e.g. 4000"
              className="input input-bordered w-full"
            />
          </div>

          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
