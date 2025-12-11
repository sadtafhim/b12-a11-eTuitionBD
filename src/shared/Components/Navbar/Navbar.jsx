"use client";

import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { AnimatePresence, motion } from "motion/react";
import { Link, NavLink } from "react-router";
import { CiLogin } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import useAuth from "../../../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start" />

        <div className="navbar-center bg-linear-to-r from-primary to-secondary/80 text-primary-content rounded-full px-2 pr-4 py-2 flex items-center gap-1 md:gap-2 shadow-2xl shadow-primary/50">
          <NavLink to="/" className="btn btn-ghost hover:bg-primary/60">
            <img className="w-36" src={logo} alt="EtutionBD Logo" />
          </NavLink>

          <AnimatePresence initial={false}>
            {isVisible && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-4"
              >
                <NavLink
                  to="/about"
                  className="btn btn-ghost text-base-100 hover:bg-accent rounded-full"
                >
                  About
                </NavLink>
                <NavLink
                  to="/contacts"
                  className="btn btn-ghost text-base-100 hover:bg-accent rounded-full"
                >
                  Contact
                </NavLink>
                <button className="btn btn-ghost text-base-100 hover:bg-accent rounded-full">
                  Lightmode
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setIsVisible(!isVisible)}
            whileTap={{ scale: 0.95 }}
            className="btn btn-ghost text-base-100 hover:bg-accent rounded-full text-lg"
          >
            {isVisible ? <RxCrossCircled size={26} /> : "Menu"}
          </motion.button>
          <div className="flex items-center gap-4">
            {user ? (
              // --- LOGGED IN STATE ---
              <div className="flex items-center gap-3">
                <NavLink
                  to="/dashboard"
                  className="hidden md:flex btn btn-ghost btn-sm font-heading"
                >
                  Dashboard
                </NavLink>

                {/* Profile Dropdown */}
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar border-2 border-primary"
                  >
                    <div className="w-10 rounded-full">
                      {user?.photoURL ? (
                        <img src={user?.photoURL} alt="User Profile" />
                      ) : (
                        <FaUserCircle className="w-full h-full text-primary" />
                      )}
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-2xl border border-base-300"
                  >
                    <li className="px-4 py-2 font-bold text-primary border-b border-base-200 mb-2">
                      {user?.displayName || "User"}
                    </li>
                    <li>
                      <Link to="/dashboard/profile">View Profile</Link>
                    </li>
                    <li>
                      <Link to="/dashboard">My Lessons</Link>
                    </li>
                    <li className="mt-2 pt-2 border-t border--base-200">
                      <button
                        onClick={handleLogout}
                        className="text-error font-semibold"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              // --- LOGGED OUT STATE ---
              <div className="flex items-center gap-2">
                <NavLink
                  to="/auth/login"
                  className="btn border-0 bg-linear-to-r from-accent to-primary text-white px-6 rounded-full hover:scale-105 transition-transform"
                >
                  <CiLogin size={26} /> Login
                </NavLink>
              </div>
            )}
          </div>
          <NavLink
            to="/auth/register"
            className="hidden sm:flex btn btn-primary rounded-full px-6"
          >
            Become a Tutor
          </NavLink>
        </div>
        <div className="navbar-end" />
      </div>
    </div>
  );
};

export default Navbar;
