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
      description:
        "We empower educators and learners by providing tools and opportunities to excel.",
    },
    {
      icon: FaHeart,
      title: "Passion for Education",
      description:
        "Our team is driven by a shared mission to make quality education accessible to everyone.",
    },
    {
      icon: FaLaptopCode,
      title: "Innovation",
      description:
        "We constantly evolve our technology to create the best learning experience possible.",
    },
  ];

  const openRoles = [
    {
      role: "Senior Software Engineer (Full Stack)",
      department: "Technology",
      description:
        "Drive the development of our core tutoring platform features and infrastructure.",
    },
    {
      role: "Academic Success Manager",
      department: "Operations",
      description:
        "Lead initiatives to improve student engagement and tutor performance metrics.",
    },
    {
      role: "Marketing Specialist (SEO/Content)",
      department: "Marketing",
      description:
        "Grow our educator and student base through targeted digital content and SEO strategies.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <section className="bg-primary/10 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-primary mb-4">
            Build the Future of Education with Us
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-base-content/80">
            Join the eTuitionBD team and contribute to a platform that connects
            thousands of students with expert educators every day.
          </p>
          <Link
            to="#open-roles"
            className="btn btn-primary btn-lg mt-8 shadow-md"
          >
            Explore Open Positions
          </Link>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="card bg-base-200 p-6 shadow-xl text-center hover:shadow-2xl transition duration-300"
              >
                <value.icon className="text-6xl text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{value.title}</h3>
                <p className="text-base-content/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base-300 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Life at eTuitionBD
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <FaUserTie className="text-4xl text-secondary mx-auto mb-3" />
              <p className="font-semibold">Flexible Work Hours</p>
              <p className="text-sm text-base-content/70">
                Work where and when you're most productive.
              </p>
            </div>
            <div className="text-center p-4">
              <FaGraduationCap className="text-4xl text-secondary mx-auto mb-3" />
              <p className="font-semibold">Professional Development</p>
              <p className="text-sm text-base-content/70">
                Annual budget for courses, conferences, and certifications.
              </p>
            </div>
            <div className="text-center p-4">
              <FaChalkboardTeacher className="text-4xl text-secondary mx-auto mb-3" />
              <p className="font-semibold">Impactful Work</p>
              <p className="text-sm text-base-content/70">
                Directly see the results of your contribution to global
                education.
              </p>
            </div>
            <div className="text-center p-4">
              <FaHeart className="text-4xl text-secondary mx-auto mb-3" />
              <p className="font-semibold">Comprehensive Health Care</p>
              <p className="text-sm text-base-content/70">
                Full medical, dental, and vision coverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="open-roles" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            Current Open Positions
          </h2>
          <p className="text-center text-lg text-base-content/80 mb-10">
            Don't see your role? Send us your resume anyway!
          </p>

          <div className="space-y-6 max-w-4xl mx-auto">
            {openRoles.map((role, index) => (
              <div
                key={index}
                className="card card-side bg-base-200 shadow-lg p-6 hover:bg-base-300 transition duration-300"
              >
                <div className="card-body p-0 md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="card-title text-2xl text-primary">
                      {role.role}
                    </h3>
                    <p className="text-md text-base-content/70 font-medium mb-2">
                      {role.department}
                    </p>
                    <p className="text-base-content">{role.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6 shrink-0">
                    <a href="#" className="btn btn-outline btn-primary">
                      Apply Now <FaArrowRight />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-base-content">
              Ready to make a difference? We look forward to meeting you!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;
