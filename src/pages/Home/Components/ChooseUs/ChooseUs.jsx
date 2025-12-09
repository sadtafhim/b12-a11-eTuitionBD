import React from "react";
import { motion } from "framer-motion";
import {
  FaUserShield,
  FaHandshake,
  FaMoneyBillWave,
  FaComments,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUserShield />,
    title: "Verified & Expert Tutors",
    text: "Access a curated network of experienced tutors, all verified by the admin to ensure quality and safety.",
    // Using Primary for trust/security
    colorVar: "var(--color-primary)",
  },
  {
    icon: <FaHandshake />,
    title: "Transparent Payment System",
    text: "Secure and structured payment flow (via Stripe) ensures tutors are paid on time only after approval.",
    // Using Accent for financial/highlight
    colorVar: "var(--color-accent)",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Flexible Budget & Schedule",
    text: "Post tuition requirements with a custom budget and schedule that works for you, attracting ideal candidates.",
    // Using Primary for core service
    colorVar: "var(--color-primary)",
  },
  {
    icon: <FaComments />,
    title: "Structured Communication",
    text: "Manage applications, approve tutors, and track tuition status efficiently within a single platform.",
    // Using Accent for efficiency/call-to-action focus
    colorVar: "var(--color-accent)",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ChooseUs = () => {
  return (
    <div className="font-body">
      {/* Section Header Bar */}
      <div className="text-center mb-16">
        <h2 className="text-sm font-semibold uppercase text-accent tracking-wider">
          Always Reliable
        </h2>
        <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 text-base-content">
          Why Choose eTutionBD
        </h1>
      </div>
      <section className=" px-6 bg-[--color-base-100]">
        <div className="max-w-7xl mx-auto text-center">
          {/* Subheading/Description */}
          <p className="max-w-3xl mx-auto mb-14 text-lg leading-relaxed text-[--color-base-content] opacity-80">
            We provide a verified, secure, and streamlined platform that
            connects students with the best tutors and offers transparent
            management tools for everyone.
          </p>

          {/* Cards Container: Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                // Use whileInView for scroll-based animation
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Ensures animation only runs once
                variants={cardVariants}
                className="rounded-xl p-8 shadow-xl border flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                style={{
                  background: "var(--color-base-200)",
                  borderColor: "var(--color-base-300)",
                }}
              >
                {/* Icon (Color is dynamic based on Primary/Accent) */}
                <div className="text-5xl" style={{ color: item.colorVar }}>
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-heading font-semibold text-[--color-base-content]">
                  {item.title}
                </h3>

                {/* Text */}
                <p className="text-base leading-relaxed text-[--color-base-content] opacity-70">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChooseUs;
