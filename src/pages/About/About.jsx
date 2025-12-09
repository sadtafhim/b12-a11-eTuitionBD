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
    colorClass: "text-primary",
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Verified Tutors",
    text: "We ensure rigorous verification of every tutor, providing peace of mind and guaranteeing teaching quality.",
    colorClass: "text-accent",
  },
  {
    icon: <FaGlobe />,
    title: "Accessible Learning",
    text: "Providing affordable and flexible tuition options that break down geographical and economic barriers to education.",
    colorClass: "text-primary",
  },
  {
    icon: <FaHandsHelping />,
    title: "Supportive Community",
    text: "We foster a supportive environment where both students and tutors can thrive and achieve mutual success.",
    colorClass: "text-accent",
  },
];

const About = () => {
  return (
    <div>
      <section className="bg-base-200 py-20 lg:py-28 font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold uppercase text-accent tracking-wider font-heading">
              Our Story & Commitment
            </h2>
            <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 text-base-content font-heading">
              More Than Just a Platform
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 lg:order-1 order-2">
              <p className="text-2xl font-medium text-base-content leading-relaxed">
                <span className="font-bold">eTuitionBd</span> was founded on the
                belief that quality education should be accessible, affordable,
                and flexible for everyone, everywhere.
              </p>
              <p className="text-md text-base-content opacity-75">
                We connect thousands of dedicated students with{" "}
                <span className="font-bold">
                  pre-vetted, experienced educators
                </span>{" "}
                who are passionate about imparting knowledge. Our secure,
                streamlined platform manages everything from job postings and
                tutor applications to transparent payment processing, ensuring a
                hassle-free experience so you can focus purely on learning and
                teaching.
              </p>
            </div>

            {/* Right Column: Mission Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:order-2 order-1">
              {missionHighlights.map((item, index) => (
                <div
                  key={index}
                  className="card bg-base-100 shadow-lg p-6 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Highlight Icon */}
                  <div
                    className="text-4xl mb-4"
                    style={{
                      color: item.colorClass.includes("primary")
                        ? "var(--color-primary)"
                        : "var(--color-accent)",
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Title and Text */}
                  <h3 className="text-xl font-bold text-base-content mb-2 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-sm text-base-content opacity-70">
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
