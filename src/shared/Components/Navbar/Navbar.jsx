"use client";

import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { AnimatePresence, motion } from "motion/react";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Navbar Start */}
        <div className="navbar-start" />

        {/* Navbar Center Container */}
        <div className="navbar-center bg-primary rounded-2xl px-4 py-2 flex items-center gap-4 shadow-lg">
          {/* Logo */}
          <a className="btn btn-ghost hover:bg-primary/60">
            <img className="w-36" src={logo} alt="EtutionBD Logo" />
          </a>

          {/* Animated Menu */}
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
                {/* Tuitions */}
                <div className="dropdown dropdown-hover">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost text-base-100"
                  >
                    Tuitions
                  </div>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-base-100 rounded-box w-52 shadow-md"
                  >
                    <li>
                      <NavLink className="hover:bg-accent hover:text-base-100">
                        Tuitions Listing
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="hover:bg-accent hover:text-base-100">
                        Tuition Details
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/* Tutors */}
                <div className="dropdown dropdown-hover">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost text-base-100"
                  >
                    Tutors
                  </div>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-base-100 rounded-box w-52 shadow-md"
                  >
                    <li>
                      <a className="hover:bg-accent hover:text-base-100">
                        Tutor Listing
                      </a>
                    </li>
                    <li>
                      <a className="hover:bg-accent hover:text-base-100">
                        Tutor Profile
                      </a>
                    </li>
                  </ul>
                </div>

                <NavLink className="btn btn-ghost text-base-100">About</NavLink>
                <NavLink className="btn btn-ghost text-base-100">
                  Contact
                </NavLink>
                <NavLink className="btn btn-ghost text-base-100">
                  Lightmode
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Menu Toggle */}
          <motion.button
            onClick={() => setIsVisible(!isVisible)}
            whileTap={{ scale: 0.95 }}
            className="btn btn-ghost text-base-100"
          >
            {isVisible ? "Close" : "Menu"}
          </motion.button>

          {/* Logout */}
          <button className="btn btn-accent text-base-100 px-6">Logout</button>
        </div>

        {/* Navbar end */}
        <div className="navbar-end" />
      </div>
    </div>
  );
};

export default Navbar;
