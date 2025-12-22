import React from "react";
import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaGlobe,
  FaHandsHelping,
} from "react-icons/fa";

const missionHighlights = [
  {
    icon: <FaGraduationCap />,
    title: "Empowering Students",
    text: "Our core mission is to connect every student with the right expertise needed to unlock their academic potential.",
    color: "primary",
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Verified Tutors",
    text: "We ensure rigorous verification of every tutor, providing peace of mind and guaranteeing teaching quality.",
    color: "accent",
  },
  {
    icon: <FaGlobe />,
    title: "Accessible Learning",
    text: "Providing affordable and flexible tuition options that break down geographical and economic barriers to education.",
    color: "primary",
  },
  {
    icon: <FaHandsHelping />,
    title: "Supportive Community",
    text: "We foster a supportive environment where both students and tutors can thrive and achieve mutual success.",
    color: "accent",
  },
];

const About = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      <section className="bg-base-100 py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-20">
            <h2 className="text-sm font-semibold uppercase text-accent tracking-[0.2em] mb-2">
              Our Story & Commitment
            </h2>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-base-content">
              More Than Just <span className="text-primary">A Platform</span>
            </h1>
            <div className="w-24 h-1.5 bg-primary/20 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="space-y-8 lg:order-1 order-2">
              <div className="relative">
                <span className="absolute -left-4 top-0 w-1 h-full bg-primary rounded-full opacity-50 hidden lg:block"></span>
                <p className="text-2xl lg:text-3xl font-bold text-base-content leading-tight">
                  <span className="text-primary">eTuitionBd</span> was founded on the belief that quality education should be accessible, affordable, and flexible for everyone.
                </p>
              </div>

              <p className="text-lg text-base-content opacity-70 leading-relaxed">
                We connect thousands of dedicated students with{" "}
                <span className="font-bold text-base-content opacity-100">
                  pre-vetted, experienced educators
                </span>{" "}
                who are passionate about imparting knowledge. Our secure,
                streamlined platform manages everything from job postings and
                tutor applications to transparent payment processing.
              </p>

              <div className="flex gap-4 pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-primary">10k+</span>
                  <span className="text-xs uppercase font-bold tracking-widest opacity-50">Students</span>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-accent">500+</span>
                  <span className="text-xs uppercase font-bold tracking-widest opacity-50">Expert Tutors</span>
                </div>
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:order-2 order-1 relative">

              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10"></div>

              {missionHighlights.map((item, index) => (
                <div
                  key={index}
                  className="card bg-base-200 shadow-xl p-8 rounded-2xl relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group"
                >

                  <div className={`absolute top-0 left-0 w-full h-1.5 ${item.color === 'primary' ? 'bg-primary' : 'bg-accent'}`}></div>

                  <div className={`text-4xl mb-6 transition-transform duration-500 group-hover:scale-110 ${item.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-extrabold text-base-content mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-base-content opacity-60 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;