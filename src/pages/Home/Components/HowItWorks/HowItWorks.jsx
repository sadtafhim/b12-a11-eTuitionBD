import React from "react";
import { FaUserPlus, FaCheckCircle, FaLaptopCode } from "react-icons/fa"; // Using relevant icons

const HowItWorks = () => {
  return (
    <section className="bg-[--color-base-100] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase text-accent tracking-wider">
            Simple & Fast
          </h2>
          <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 text-base-content">
            How Our Platform Works
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="card bg-base-200 shadow-xl p-8 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
            <div className="flex flex-col items-center text-center">
              <FaUserPlus className="text-5xl text-primary mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">Step 1</h3>
              <p className="text-3xl font-extrabold text-base-content mb-3">
                Post A Tuition
              </p>
              <p className="text-base-content opacity-70">
                Register as a student and easily publish your detailed tuition
                requirements (subject, budget, schedule).
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl p-8 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]">
            <div className="absolute top-0 left-0 w-full h-2 bg-accent"></div>

            <div className="flex flex-col items-center text-center">
              <FaCheckCircle className="text-5xl text-accent mb-4" />
              <h3 className="text-xl font-bold text-accent mb-2">Step 2</h3>
              <p className="text-3xl font-extrabold text-base-content mb-3">
                Approve & Pay
              </p>
              <p className="text-base-content opacity-70">
                Review applications from qualified tutors, select your preferred
                expert, and complete the secure payment.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl p-8 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
            <div className="flex flex-col items-center text-center">
              <FaLaptopCode className="text-5xl text-primary mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">Step 3</h3>
              <p className="text-3xl font-extrabold text-base-content mb-3">
                Start Studying
              </p>
              <p className="text-base-content opacity-70">
                Connect with your approved tutor instantly and begin your
                personalized learning journey right away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
