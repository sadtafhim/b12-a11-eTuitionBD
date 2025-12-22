import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUserGraduate, FaMoneyBillWave, FaTimes, FaCheck, FaBriefcase } from "react-icons/fa";

const AppliedTutors = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: applicants = [], refetch, isLoading } = useQuery({
    queryKey: ["applicants", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuition-applications/${id}`);
      return res.data;
    },
  });

  const handleReject = async (appId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will notify the tutor and cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, reject tutor",
      customClass: {
        popup: 'rounded-3xl',
        confirmButton: 'rounded-full px-6',
        cancelButton: 'rounded-full px-6'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/applications/reject/${appId}`);
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Rejected",
              text: "Tutor has been notified.",
              icon: "success",
              customClass: { popup: 'rounded-3xl' }
            });
            refetch();
          }
        } catch (error) {
          Swal.fire("Error", "Something went wrong.", "error");
        }
      }
    });
  };

  if (isLoading) return <div className="p-8 text-center"><span className="loading loading-dots loading-lg text-primary"></span></div>;

  return (
    <div className="p-4 md:p-8 bg-base-100 min-h-screen">
      <header className="mb-10">
        <h2 className="text-3xl font-black text-base-content flex items-center gap-3">
          <span className="w-2 h-10 bg-primary rounded-full"></span>
          Applicants for this Position
        </h2>
        <p className="text-base-content opacity-60 mt-2 ml-5">
          Review qualifications and hire the best tutor for your requirements.
        </p>
      </header>

      {applicants.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-[3rem] border-2 border-dashed border-base-300">
          <div className="text-6xl text-base-content opacity-20 mb-4 flex justify-center"><FaUserGraduate /></div>
          <h3 className="text-xl font-bold opacity-50">No applicants yet.</h3>
          <p className="opacity-40">Your post is visible; tutors will apply soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {applicants.map((app) => (
            <div
              key={app._id}
              className="group bg-base-200 rounded-4xl p-6 transition-all duration-300 hover:shadow-xl hover:bg-base-100 border border-transparent hover:border-primary/20 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">

                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-base-100 shadow-lg">
                    <img
                      src={app.tutorPhoto}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                      alt={app.tutorName}
                    />
                  </div>
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-base-200 flex items-center justify-center text-white text-xs ${app.status === 'accepted' ? 'bg-success' : app.status === 'rejected' ? 'bg-error' : 'bg-warning'}`}>
                    {app.status === 'accepted' ? <FaCheck /> : app.status === 'rejected' ? <FaTimes /> : '!'}
                  </div>
                </div>


                <div className="grow">
                  <h3 className="text-xl font-black text-base-content group-hover:text-primary transition-colors">
                    {app.tutorName}
                  </h3>

                  <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2">
                    <p className="text-sm font-medium opacity-70 flex items-center gap-1">
                      <FaUserGraduate className="text-primary" /> {app.qualifications}
                    </p>
                    <p className="text-sm font-medium opacity-70 flex items-center gap-1">
                      <FaBriefcase className="text-accent" /> {app.experience} Exp.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 bg-primary/10 w-fit px-4 py-1.5 rounded-full">
                    <FaMoneyBillWave className="text-primary" />
                    <span className="font-bold text-primary">Expected: ${app.expectedSalary}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  {app.status === "pending" ? (
                    <>
                      <button
                        onClick={() =>
                          navigate("/dashboard/payment", {
                            state: { applicant: app },
                          })
                        }
                        className="btn btn-primary rounded-full px-6 font-bold shadow-lg shadow-primary/20 border-none"
                      >
                        Accept & Pay
                      </button>
                      <button
                        onClick={() => handleReject(app._id)}
                        className="btn btn-ghost hover:bg-error/10 hover:text-error rounded-full font-bold transition-all"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <div className={`px-6 py-2 rounded-full font-black text-xs tracking-widest text-white uppercase text-center shadow-md ${app.status === "accepted" ? "bg-success" : "bg-error"
                      }`}>
                      {app.status}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedTutors;