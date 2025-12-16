import React from "react";
import { FaBook, FaShieldAlt, FaHandshake } from "react-icons/fa";
import { Link } from "react-router";

const TermsOfService = () => {
  const lastUpdated = "December 16, 2025";
  const platformName = "eTuitionBD";
  const companyEmail = "support@etuitionbd.com";

  return (
    <div className="min-h-screen bg-base-100 py-12 md:py-20 px-4 sm:px-6 lg:px-8 text-base-content">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <FaShieldAlt className="text-6xl text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold mb-2">Terms of Service</h1>
          <p className="text-lg text-base-content/70">
            Welcome to {platformName}. Please read these terms carefully before
            using our services.
          </p>
          <p className="text-sm mt-1">Last Updated: {lastUpdated}</p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing or using the {platformName} platform (the "Service"),
              you agree to be bound by these Terms of Service ("Terms"). If you
              disagree with any part of the terms, then you may not access the
              Service. These Terms apply to all visitors, users, and others who
              wish to access or use the Service, including Students, Tutors, and
              Administrators.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">
              2. User Accounts and Eligibility
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <span className="font-black">Eligibility:</span> You must be at
                least 18 years old or have permission from a parent or legal
                guardian to use the Service.
              </li>
              <li>
                <span className="font-black">Account Responsibilities:</span>{" "}
                You are responsible for safeguarding the password that you use
                to access the Service and for any activities or actions under
                your password.
              </li>
              <li>
                <span className="font-black">Accuracy:</span> All information
                you provide must be accurate, complete, and current.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">
              3. Services Provided
            </h2>
            <p>
              {platformName} provides an online marketplace connecting students
              seeking tutoring services ("Students") with independent
              contractors who offer tutoring services ("Tutors"). We are not a
              party to the direct contract between the Student and the Tutor.
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2">
              3.1. Role of {platformName}
            </h3>
            <p className="pl-4 border-l-4 border-primary/50">
              We facilitate the connection, provide payment processing, and
              offer tools for scheduling and communication. We do not employ
              Tutors, nor are we responsible for the quality, legality, or
              suitability of the tutoring services provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">
              4. Tutor Code of Conduct
            </h2>
            <p>Tutors agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Maintain professional conduct and a high standard of educational
                quality.
              </li>
              <li>
                Accurately represent their qualifications, experience, and
                services offered.
              </li>
              <li>
                Comply with all local and national laws regarding tutoring and
                instruction.
              </li>
              <li>
                Not engage in inappropriate communication or solicit private
                contact information outside the Service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">
              5. Payments and Fees
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <span className="font-black">Pricing:</span> Tutors set their
                own hourly rates, which are displayed on their profile.
              </li>
              <li>
                <span className="font-black">Platform Fee:</span> {platformName}{" "}
                charges a service fee (e.g., 10-20%) on the Tutor’s billed rate.
                This fee is automatically deducted before payment is remitted to
                the Tutor.
              </li>
              <li>
                <span className="font-black">Cancellations:</span> Cancellation
                policies (defined by the Tutor or the platform) will govern
                refunds or charges for missed sessions.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">
              6. Prohibited Uses
            </h2>
            <p>
              You may use the Service only for lawful purposes. You agree not to
              use the Service:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                To solicit or facilitate illegal activity or transmit harmful,
                defamatory, or obscene content.
              </li>
              <li>
                To copy, distribute, or create derivative works from the content
                of {platformName} or its users.
              </li>
              <li>
                To bypass the platform's payment system to arrange private
                tutoring sessions ("circumvention").
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">
              7. Termination
            </h2>
            <p>
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason whatsoever, including,
              without limitation, a breach of the Terms. Upon termination, your
              right to use the Service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">
              8. Limitation of Liability
            </h2>
            <p className="pl-4 border-l-4 border-error/50">
              In no event shall {platformName}, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from (i) your
              access to or use of or inability to access or use the Service;
              (ii) any conduct or content of any third party on the Service;
              (iii) any content obtained from the Service; and (iv) unauthorized
              access, use or alteration of your transmissions or content,
              whether based on warranty, contract, tort (including negligence)
              or any other legal theory.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">
              9. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="font-semibold mt-2">
              Email:{" "}
              <a
                href={`mailto:${companyEmail}`}
                className="text-primary hover:underline"
              >
                {companyEmail}
              </a>
            </p>
            <p className="mt-4">
              You may also review our{" "}
              <Link to="/privacypolicy" className="text-info hover:underline">
                Privacy Policy
              </Link>{" "}
              for details on how we handle your data.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
