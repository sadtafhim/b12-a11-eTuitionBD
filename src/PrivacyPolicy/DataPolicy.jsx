import React from "react";
import {
  FaLock,
  FaUsers,
  FaCookieBite,
  FaExclamationCircle,
  FaCheckCircle,
  FaShieldAlt,
  FaHandshake,
} from "react-icons/fa";
import { Link } from "react-router";

const DataPolicy = () => {
  const lastUpdated = "December 16, 2025";
  const platformName = "eTuitionBD";
  const companyEmail = "support@etuitionbd.com";

  return (
    <div className="min-h-screen bg-base-100 py-12 md:py-20 px-4 sm:px-6 lg:px-8 text-base-content">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <FaLock className="text-6xl text-success mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold mb-2">Privacy Policy</h1>
          <p className="text-lg text-base-content/70">
            Your privacy is critically important to us. This policy outlines how
            we handle your personal data.
          </p>
          <p className="text-sm mt-1">Last Updated:{lastUpdated}</p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-success flex items-center">
              <FaUsers className="mr-3" /> 1. Information We Collect
            </h2>
            <p>
              We collect several different types of information for various
              purposes to provide and improve our Service to you.
            </p>

            <h3 className="text-xl font-semibold mt-4 mb-2">
              1.1. Personal Data
            </h3>
            <p className="pl-4 border-l-4 border-success/50">
              While using our Service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you ("Personal Data"). This may include, but is not
              limited to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-8 mt-2">
              <li>
                <span className="font-black">Identity Data:</span> Email
                address, Display Name, Profile Picture (PhotoURL).
              </li>
              <li>
                <span className="font-black">Financial Data:</span> Payment
                information (handled securely by third-party processors).
              </li>
              <li>
                <span className="font-black">Tutor Verification Data:</span>{" "}
                (For Tutors) Educational qualifications, government ID for
                verification, and specialized subject areas.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2">1.2. Usage Data</h3>
            <p className="pl-4 border-l-4 border-success/50">
              We may also collect information that your browser sends whenever
              you visit our Service or when you access the Service by or through
              a mobile device ("Usage Data"). This includes your computer's
              Internet Protocol address (IP address), browser type, browser
              version, the pages of our Service that you visit, the time and
              date of your visit, and time spent on those pages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-success flex items-center">
              <FaCheckCircle className="mr-3" /> 2. How We Use Your Data
            </h2>
            <p>{platformName} uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                To provide and maintain the Service (connecting Students and
                Tutors).
              </li>
              <li>To manage your account and provide customer support.</li>
              <li>
                To monitor the usage of the Service and detect, prevent, and
                address technical issues.
              </li>
              <li>To verify the identity and qualifications of Tutors.</li>
              <li>
                To send you transactional emails (e.g., confirmations, payment
                receipts).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-success flex items-center">
              <FaShieldAlt className="mr-3" /> 3. Data Retention and Security
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <span className="font-black">Retention:</span> We will retain
                your Personal Data only for as long as is necessary for the
                purposes set out in this Privacy Policy, typically for the
                duration of your account plus a reasonable administrative
                period.
              </li>
              <li>
                <span className="font-black">Security:</span> The security of
                your data is important to us. We use industry-standard measures
                (like encryption and secure server access) to protect your
                Personal Data. However, no method of transmission over the
                Internet or method of electronic storage is 100% secure.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-success flex items-center">
              <FaHandshake className="mr-3" /> 4. Disclosure of Personal Data
            </h2>
            <p>
              We may share your personal information in the following
              situations:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <span className="font-black">With Tutors/Students:</span> Your
                Display Name and Profile Picture are visible to other users to
                facilitate the tutoring relationship. Your email is kept private
                from other users.
              </li>
              <li>
                <span className="font-black">Service Providers:</span> We may
                employ third-party companies and individuals to facilitate our
                Service (e.g., payment processing, cloud hosting).
              </li>
              <li>
                <span className="font-black">Legal Requirements:</span> We may
                disclose your Personal Data in the good faith belief that such
                action is necessary to comply with a legal obligation.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-success flex items-center">
              <FaCookieBite className="mr-3" /> 5. Cookies
            </h2>
            <p>
              We use cookies and similar tracking technologies to track the
              activity on our Service and hold certain information.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <span className="font-black">Authentication Cookies:</span>{" "}
                Essential for remembering your login status (used by Firebase
                Authentication).
              </li>
              <li>
                <span className="font-black">Security Cookies:</span> Used for
                security purposes and preventing fraudulent activity.
              </li>
              <li>
                <span className="font-black">Preference Cookies:</span> Used to
                remember your preferences and various settings.
              </li>
            </ul>
            <p className="mt-2">
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept
              cookies, you may not be able to use some portions of our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-success flex items-center">
              <FaExclamationCircle className="mr-3" /> 6. Children's Privacy
            </h2>
            <p>
              Our Service is not intended for use by anyone under the age of 18
              without parental consent. We do not knowingly collect personally
              identifiable information from anyone under the age of 13. If you
              are a parent or guardian and you are aware that your child has
              provided us with Personal Data, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-success flex items-center">
              7. Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last Updated" date. You are advised to review
              this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-success flex items-center">
              8. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us:
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
              You can also review our{" "}
              <Link to="/termsofservice" className="text-info hover:underline">
                Terms of Service
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DataPolicy;
