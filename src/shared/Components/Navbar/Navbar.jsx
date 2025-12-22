"use client";

import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router";
import { CiLogin } from "react-icons/ci";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import useAuth from "../../../hooks/useAuth";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user, logOut } = useAuth();

  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "etuitionbd-light"
      : "etuitionbd-light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "etuitionbd-light" ? "etuitionbd-dark" : "etuitionbd-light"));
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
    }
  };

  return (
    <div className="bg-base-100 border-b border-base-300 sticky top-0 z-50 transition-colors duration-300">
      <div className="navbar max-w-7xl mx-auto px-4">

        <div className="navbar-start hidden lg:flex" />

        <div
          className="
            navbar-center
            bg-primary text-primary-content
            rounded-full px-2 py-2
            flex items-center gap-1 md:gap-2
            shadow-lg
          "
        >

          <NavLink
            to="/"
            className="btn btn-ghost hover:bg-primary-focus rounded-full px-3"
          >
            <img className="w-32 md:w-36" src={logo} alt="EtutionBD Logo" />
          </NavLink>

          <AnimatePresence>
            {isVisible && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, x: -15, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "auto" }}
                exit={{ opacity: 0, x: -15, width: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
              >
                <NavLink
                  to="/about"
                  className="btn btn-ghost btn-sm text-primary-content hover:bg-secondary rounded-full"
                >
                  About
                </NavLink>

                <NavLink
                  to="/contacts"
                  className="btn btn-ghost btn-sm text-primary-content hover:bg-secondary rounded-full"
                >
                  Contact
                </NavLink>

                {
                  user && (<><NavLink
                    to="/dashboard"
                    className="
                    hidden md:flex
                    btn btn-ghost btn-sm
                    text-primary-content
                    hover:bg-secondary
                    rounded-full
                  "
                  >
                    Dashboard
                  </NavLink></>)
                }

                <button
                  onClick={toggleTheme}
                  title="Toggle Theme"
                  className="btn btn-ghost btn-sm text-primary-content hover:bg-secondary rounded-full px-2"
                >
                  {theme === "etuitionbd-light" ? (
                    <FaMoon size={16} className="text-yellow-200" />
                  ) : (
                    <FaSun size={16} className="text-orange-400" />
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setIsVisible(!isVisible)}
            whileTap={{ scale: 0.9 }}
            className="
              btn btn-ghost btn-sm
              text-primary-content
              hover:bg-secondary
              rounded-full
            "
          >
            {isVisible ? <RxCross2 size={20} /> : <RxHamburgerMenu size={20} />}
          </motion.button>
          <div className="flex items-center gap-3 ml-1">
            {user ? (
              <>

                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar ring-1 ring-primary-content/40 shadow-inner"
                  >
                    <div className="w-10 rounded-full">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="User Avatar" />
                      ) : (
                        <FaUserCircle className="w-full h-full text-primary-content" />
                      )}
                    </div>
                  </label>

                  <ul
                    tabIndex={0}
                    className="
                      menu menu-sm dropdown-content
                      mt-3 w-52
                      bg-base-100
                      rounded-2xl
                      shadow-2xl
                      border border-base-300
                      z-100
                      text-base-content
                    "
                  >
                    <li className="px-4 py-3 border-b border-base-300 mb-1 pointer-events-none">
                      <p className="text-[10px] uppercase tracking-wider opacity-60">Signed in as</p>
                      <p className="font-bold truncate">{user.displayName || user.email}</p>
                    </li>

                    <li><Link to="/dashboard/profile" className="py-2">Profile</Link></li>
                    <li><Link to="/dashboard" className="py-2">My Lessons</Link></li>

                    <li className="mt-2 pt-2 border-t border-base-300">
                      <button
                        onClick={handleLogout}
                        className="text-error font-bold hover:bg-error/10"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <NavLink
                to="/auth/login"
                className="
                  btn btn-accent btn-sm
                  rounded-full px-5
                  text-accent-content
                  flex items-center gap-2
                  shadow-md hover:scale-105 transition-transform
                "
              >
                <CiLogin size={20} />
                <span className="font-bold">Login</span>
              </NavLink>
            )}
          </div>

        </div>

        <div className="navbar-end hidden lg:flex" />
      </div>
    </div>
  );
};

export default Navbar;