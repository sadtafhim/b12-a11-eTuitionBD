"use client";

import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { AnimatePresence, motion } from "motion/react";
import { NavLink } from "react-router";
import { CiLogin } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start" />

        <div className="navbar-center bg-linear-to-r from-primary to-secondary/80 text-primary-content rounded-full px-2 pr-4 py-2 flex items-center gap-1 md:gap-2 shadow-2xl shadow-primary/50">
          <a className="btn btn-ghost hover:bg-primary/60">
            <img className="w-36" src={logo} alt="EtutionBD Logo" />
          </a>

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
                <div className="dropdown dropdown-hover hover:bg-accent rounded-full ">
                  <NavLink tabIndex={0} role="button" className="btn btn-ghost">
                    Tuitions
                  </NavLink>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-linear-to-r from-primary to-secondary rounded-box w-52 shadow-md"
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

                <div className="dropdown dropdown-hover hover:bg-accent rounded-full">
                  <NavLink
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost "
                  >
                    Tutors
                  </NavLink>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-linear-to-r from-primary to-secondary rounded-box w-52 shadow-md"
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

                <NavLink className="btn btn-ghost text-base-100 hover:bg-accent rounded-full">
                  About
                </NavLink>
                <NavLink className="btn btn-ghost text-base-100 hover:bg-accent rounded-full">
                  Contact
                </NavLink>
                <NavLink className="btn btn-ghost text-base-100 hover:bg-accent rounded-full">
                  Lightmode
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Menu Toggle */}
          <motion.button
            onClick={() => setIsVisible(!isVisible)}
            whileTap={{ scale: 0.95 }}
            className="btn btn-ghost text-base-100 hover:bg-accent rounded-full text-lg"
          >
            {isVisible ? <RxCrossCircled size={26} /> : "Menu"}
          </motion.button>

          {/* Logout */}
          <button className="btn border-0 bg-linear-to-r from-accent to-base-content/50 text-base-100 px-6 rounded-full">
            <CiLogin size={26} /> Login
          </button>
        </div>

        {/* Navbar end */}
        <div className="navbar-end" />
      </div>
    </div>
  );
};

export default Navbar;
