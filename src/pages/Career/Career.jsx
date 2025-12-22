import React from "react";
import {
  FaLaptopCode,
  FaHeart,
  FaHandsHelping,
  FaUserTie,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router";

const Career = () => {
  const values = [
    {
      icon: FaHandsHelping,
      title: "Empowerment",
      description: "We empower educators and learners by providing tools and opportunities to excel.",
      color: "primary",
    },
    {
      icon: FaHeart,
      title: "Passion for Education",
      description: "Our team is driven by a shared mission to make quality education accessible to everyone.",
      color: "accent",
    },
    {
      icon: FaLaptopCode,
      title: "Innovation",
      description: "We constantly evolve our technology to create the best learning experience possible.",
      color: "primary",
    },
  ];

  const openRoles = [
    {
      role: "Senior Software Engineer (Full Stack)",
      department: "Technology",
      description: "Drive the development of our core tutoring platform features and infrastructure.",
    },
    {
      role: "Academic Success Manager",
      department: "Operations",
      description: "Lead initiatives to improve student engagement and tutor performance metrics.",
    },
    {
      role: "Marketing Specialist (SEO/Content)",
      department: "Marketing",
      description: "Grow our educator and student base through targeted digital content and SEO strategies.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 text-base-content overflow-hidden">
      <section className="relative py-24 lg:py-32 bg-base-200">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-sm font-semibold uppercase text-accent tracking-[0.3em] mb-4">
            Join Our Team
          </h2>
          <h1 className="text-5xl lg:text-7xl font-black text-base-content mb-8 leading-tight">
            Build the Future of <br /> <span className="text-primary">Education</span> with Us
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-base-content opacity-70 mb-10 leading-relaxed">
            Join the eTuitionBD team and contribute to a platform that connects thousands of students with expert educators every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#open-roles" className="btn btn-primary btn-lg rounded-full px-10 font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              View Open Roles
            </a>
            <button className="btn btn-outline btn-primary btn-lg rounded-full px-10 font-bold hover:scale-105 transition-all">
              Our Mission
            </button>
          </div>
        </div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-sm font-semibold uppercase text-accent tracking-widest mb-2">Our Foundation</h2>
            <h1 className="text-4xl lg:text-5xl font-extrabold">Our Core Values</h1>
            <div className="w-20 h-1.5 bg-primary/20 mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <div key={index} className="card bg-base-200 p-10 rounded-2xl relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
                <div className={`absolute top-0 left-0 w-full h-2 ${value.color === 'primary' ? 'bg-primary' : 'bg-accent'}`}></div>
                <div className={`w-16 h-16 rounded-2xl mb-8 flex items-center justify-center text-3xl transition-transform group-hover:scale-110 duration-500 ${value.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                  <value.icon />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-base-content opacity-60 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-200 py-24 rounded-3xl mx-4 lg:mx-10 mb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-accent"></div>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16 italic opacity-20 uppercase tracking-tighter absolute top-10 left-0 w-full">eTuitionBD Life</h2>
          <h2 className="text-4xl font-bold text-center mb-16 relative z-10">Perks & Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: FaUserTie, title: "Flexible Work", text: "Work where and when you're most productive." },
              { icon: FaGraduationCap, title: "Growth Budget", text: "Annual budget for courses and certifications." },
              { icon: FaChalkboardTeacher, title: "Impactful Work", text: "Directly see your contribution to education." },
              { icon: FaHeart, title: "Health Care", text: "Full medical, dental, and vision coverage." }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-base-100 rounded-full flex items-center justify-center text-2xl text-secondary mx-auto mb-6 shadow-md transition-all group-hover:bg-secondary group-hover:text-white">
                  <item.icon />
                </div>
                <p className="font-bold text-lg mb-2">{item.title}</p>
                <p className="text-sm text-base-content opacity-60 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="open-roles" className="py-24 lg:py-32 bg-base-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-sm font-semibold uppercase text-accent tracking-widest mb-2">Opportunities</h2>
                <h1 className="text-4xl lg:text-5xl font-extrabold">Open Positions</h1>
              </div>
              <p className="text-base-content opacity-60 font-medium">3 Roles Available</p>
            </div>

            <div className="space-y-6">
              {openRoles.map((role, index) => (
                <div key={index} className="group bg-base-200 rounded-2xl p-8 border border-transparent hover:border-primary/20 hover:bg-base-100 transition-all duration-300 shadow-sm hover:shadow-xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-grow">
                      <span className="badge badge-primary badge-outline font-bold text-xs mb-3 px-4 py-3">{role.department}</span>
                      <h3 className="text-2xl font-black text-base-content group-hover:text-primary transition-colors mb-2">
                        {role.role}
                      </h3>
                      <p className="text-base-content opacity-60">{role.description}</p>
                    </div>
                    <div className="shrink-0">
                      <button className="btn btn-primary rounded-full px-8 font-bold group-hover:scale-105 transition-all">
                        Apply Now <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-20 p-10 bg-base-200 rounded-3xl border-2 border-dashed border-base-300">
              <h3 className="text-2xl font-bold mb-4">Don't see a perfect match?</h3>
              <p className="opacity-60 mb-8 max-w-md mx-auto">We are always looking for passionate people. Send your resume to careers@etuitionbd.com</p>
              <button className="btn btn-outline btn-primary rounded-full px-12">General Application</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;