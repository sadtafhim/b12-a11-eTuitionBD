import React from "react";
import { FaUserPlus, FaCheckCircle, FaLaptopCode, FaArrowRight } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Post A Tuition",
      desc: "Register as a student and easily publish your detailed tuition requirements like subject, budget, and schedule.",
      icon: <FaUserPlus />,
      color: "primary",
    },
    {
      id: "02",
      title: "Approve & Pay",
      desc: "Review applications from qualified tutors, select your preferred expert, and complete the secure payment.",
      icon: <FaCheckCircle />,
      color: "accent",
    },
    {
      id: "03",
      title: "Start Studying",
      desc: "Connect with your approved tutor instantly and begin your personalized learning journey right away.",
      icon: <FaLaptopCode />,
      color: "primary",
    },
  ];

  return (
    <section className="bg-base-100 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <div className="absolute top-0 right-0 -mr-20 blur-3xl opacity-10 pointer-events-none">
          <div className="w-96 h-96 bg-primary rounded-full"></div>
        </div>

        <div className="text-center mb-20">
          <h2 className="text-sm font-semibold uppercase text-accent tracking-[0.2em] mb-2">
            Simple & Fast
          </h2>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-base-content">
            How Our Platform <span className="text-primary">Works</span>
          </h1>
          <div className="w-24 h-1.5 bg-primary mx-auto mt-6 rounded-full opacity-20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">

          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-base-content/10 -translate-y-12 z-0"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative z-10"
            >
              <div className="card bg-base-200 shadow-xl p-8 rounded-2xl border border-base-300/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center h-full">

                <div className={`absolute top-0 left-0 w-full h-2 ${step.color === 'primary' ? 'bg-primary' : 'bg-accent'}`}></div>

                <div className={`absolute -top-4 px-4 py-1 rounded-full text-xs font-black tracking-widest text-white shadow-lg ${step.color === 'primary' ? 'bg-primary' : 'bg-accent'}`}>
                  STEP {step.id}
                </div>

                <div className={`mb-6 p-6 rounded-2xl transition-all duration-500 group-hover:rotate-360 ${step.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                  <span className="text-5xl">
                    {step.icon}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-base-content mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>

                <p className="text-base-content opacity-70 leading-relaxed">
                  {step.desc}
                </p>

                {index !== steps.length - 1 && (
                  <div className="md:hidden mt-8 text-base-content opacity-20 animate-bounce">
                    <FaArrowRight className="rotate-90 text-2xl" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;