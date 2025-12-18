import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CheckoutForm = ({ applicant }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { salary: applicant.expectedSalary })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [applicant, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || processing) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card: card },
      }
    );

    if (error) {
      setProcessing(false);
      Swal.fire("Payment Failed", error.message, "error");
    } else if (paymentIntent.status === "succeeded") {
      const paymentData = {
        transactionId: paymentIntent.id,
        studentEmail: applicant.studentEmail,
        tutorEmail: applicant.tutorEmail,
        amount: applicant.expectedSalary,
        applicationId: applicant._id,
        tuitionId: applicant.tuitionId,
        tuitionTitle: applicant.tuitionTitle,
      };

      const res = await axiosSecure.post("/payments", paymentData);
      if (res.data.success) {
        Swal.fire("Hired!", "Tutor accepted and Tuition confirmed.", "success");
        navigate("/dashboard/my-tuitions"); // Back to the list
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4 border border-gray-300 rounded-lg bg-white mb-6">
        <CardElement
          options={{
            style: { base: { fontSize: "16px", color: "#424770" } },
          }}
        />
      </div>
      <button
        className="btn btn-primary w-full shadow-lg"
        type="submit"
        disabled={!stripe || !clientSecret || processing}
      >
        {processing ? "Verifying..." : "Pay & Confirm Hire"}
      </button>
    </form>
  );
};

export default CheckoutForm;
