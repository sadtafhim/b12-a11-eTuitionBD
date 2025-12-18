import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const location = useLocation();
  const { applicant } = location.state || {};

  if (!applicant)
    return <div className="p-20 text-center">No data provided.</div>;

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-base-100 shadow-2xl rounded-3xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-center mb-2">
        Secure Payment
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Hiring <b>{applicant.tutorName}</b> for <b>{applicant.tuitionTitle}</b>
      </p>

      <div className="bg-blue-50 p-4 rounded-lg mb-8 flex justify-between items-center">
        <span>Total Amount:</span>
        <span className="text-2xl font-bold text-blue-700">
          ${applicant.expectedSalary}
        </span>
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm applicant={applicant} />
      </Elements>
    </div>
  );
};

export default Payment;
