import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AppliedTutors = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: applicants = [], refetch } = useQuery({
    queryKey: ["applicants", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuition-applications/${id}`);
      return res.data;
    },
  });

  const handleReject = async (appId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this tutor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, reject",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/applications/reject/${appId}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Rejected", "Tutor has been notified.", "success");
          refetch();
        }
      }
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Applicants for this Position</h2>
      <div className="grid gap-4">
        {applicants.map((app) => (
          <div
            key={app._id}
            className="border p-4 rounded-xl flex justify-between items-center bg-white shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={app.tutorPhoto}
                className="w-12 h-12 rounded-full object-cover"
                alt=""
              />
              <div>
                <h3 className="font-bold">{app.tutorName}</h3>
                <p className="text-sm text-gray-500">
                  {app.qualifications} | Exp: {app.experience}
                </p>
                <p className="text-blue-600 font-semibold">
                  Expected: ${app.expectedSalary}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {app.status === "pending" ? (
                <>
                  <button
                    onClick={() =>
                      navigate("/dashboard/payment", {
                        state: { applicant: app },
                      })
                    }
                    className="btn btn-success btn-sm text-white"
                  >
                    Accept & Pay
                  </button>
                  <button
                    onClick={() => handleReject(app._id)}
                    className="btn btn-outline btn-error btn-sm"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <span
                  className={`badge p-3 ${
                    app.status === "accepted" ? "badge-success" : "badge-error"
                  } text-white`}
                >
                  {app.status.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedTutors;
