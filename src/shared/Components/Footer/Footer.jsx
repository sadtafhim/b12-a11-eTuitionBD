import React from "react";
import logo from "../../../assets/logo.png";
import { NavLink } from "react-router";

// Simple Icon Components for contact info
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-11A8 8 0 013 7V4a1 1 0 011-1h1z" />
  </svg>
);
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const Footer = () => {
  // Determine the current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-16 w-full">
      {/* --------------------- Top Section: Links & Info --------------------- */}
      <footer className="footer bg-base-200 text-base-content p-12 lg:p-16 rounded-t-3xl shadow-2xl shadow-base-300/50">
        <div className="max-w-7xl mx-auto w-full footer sm:footer-horizontal justify-between gap-8 md:gap-16">
          {/* Column 2: Company */}
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title text-xl font-bold text-base-content/90 border-b border-primary/20 pb-2 mb-2">
              Company
            </h6>
            <NavLink
              to="/about"
              className="link link-hover opacity-80 hover:text-primary transition-colors text-base"
            >
              About Us
            </NavLink>
            <NavLink
              to="/career"
              className="link link-hover opacity-80 hover:text-primary transition-colors text-base"
            >
              Careers
            </NavLink>
          </nav>

          {/* Column 3: Legal */}
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title text-xl font-bold text-base-content/90 border-b border-primary/20 pb-2 mb-2">
              Legal
            </h6>
            <NavLink
              to="/termsofservice"
              className="link link-hover opacity-80 hover:text-primary transition-colors text-base"
            >
              Terms of Service
            </NavLink>
            <NavLink
              to="/privacy-policy"
              className="link link-hover opacity-80 hover:text-primary transition-colors text-base"
            >
              Privacy Policy
            </NavLink>
            <a className="link link-hover opacity-80 hover:text-primary transition-colors text-base">
              Cookie Policy
            </a>
            <a className="link link-hover opacity-80 hover:text-primary transition-colors text-base">
              Accessibility
            </a>
          </nav>

          {/* Column 4: Contact/Newsletter (Enhanced) */}
          <nav className="flex flex-col gap-3">
            <h6 className="footer-title text-xl font-bold text-base-content/90 border-b border-primary/20 pb-2 mb-2">
              Get in Touch
            </h6>
            <div className="flex items-center gap-2 opacity-90">
              <PhoneIcon className="text-primary" />
              <span className="text-base font-medium">+88 017 1234 5678</span>
            </div>
            <div className="flex items-center gap-2 opacity-90">
              <MailIcon className="text-primary" />
              <span className="text-base font-medium">
                support@etutionbd.com
              </span>
            </div>
            <p className="text-sm pt-2 text-base-content/70">
              Stay updated with our latest news and offers.
            </p>
            <div className="join w-full mt-2">
              <input
                type="email"
                placeholder="Email address"
                className="input input-bordered join-item w-full"
              />
              <button className="btn btn-primary join-item">Sign Up</button>
            </div>
          </nav>
        </div>
      </footer>

      {/* --------------------- Bottom Section: Branding & Copyright --------------------- */}
      <footer className="footer bg-primary text-primary-content px-10 py-5 shadow-inner shadow-primary-focus/50">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between">
          <aside className="flex items-center gap-6">
            <img
              className="w-32 md:w-40 h-auto object-contain"
              src={logo}
              alt="EtutionBD Logo"
            />
            <p className="text-sm opacity-90 leading-snug hidden sm:block">
              <span className="font-black">eTutionBD</span>{" "}
              <br className="sm:hidden" />
              <span className="text-primary-content/70">
                Empowering better tuition connection since 2024.
              </span>
            </p>
          </aside>

          {/* Copyright */}
          <div className="text-xs md:text-sm pt-4 md:pt-0 opacity-80 font-light">
            <p>Copyright © {currentYear} EtutionBD — All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
