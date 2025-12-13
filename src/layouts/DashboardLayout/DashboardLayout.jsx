import React from "react";
import {
  FaGraduationCap,
  FaPenSquare,
  FaUsers,
  FaCreditCard,
  FaUser,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logo.png";
import { Link, NavLink, Outlet, useLocation } from "react-router";

const studentNavLinks = [
  {
    path: "/dashboard/my-tuitions",
    icon: FaGraduationCap,
    label: "My Tuitions",
  },
  {
    path: "/dashboard/post-new-tuition",
    icon: FaPenSquare,
    label: "Post New Tuition",
  },
  { path: "/dashboard/applied-tutors", icon: FaUsers, label: "Applied Tutors" },
  { path: "/dashboard/payments", icon: FaCreditCard, label: "Payments" },
  { path: "/dashboard/profile", icon: FaUser, label: "Profile Settings" },
];

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.error(err));
  };

  const getCurrentPageTitle = () => {
    const activeLink = studentNavLinks.find((link) =>
      location.pathname.includes(link.path)
    );
    if (activeLink) return activeLink.label;
    if (location.pathname === "/dashboard") return "Dashboard Overview";
    return "Student Dashboard";
  };

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col min-h-screen">
          <nav className="navbar w-full bg-base-300 shadow-md sticky top-0 z-10">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            <div className="flex-1 px-4">
              <h1 className="text-xl font-bold text-base-content">
                {getCurrentPageTitle()}
              </h1>
            </div>
            <div className="flex-none px-4">
              <span className="hidden sm:inline text-sm font-medium text-base-content mr-3">
                Hello, {user?.displayName || "Student"}
              </span>
              <div className="avatar">
                <div className="w-10 rounded-full border-2 border-primary">
                  <img
                    src={user?.photoURL || "path/to/default/avatar.jpg"}
                    alt="User Avatar"
                  />
                </div>
              </div>
            </div>
          </nav>

          <main className="p-4 md:p-8 grow">
            <Outlet />
          </main>
        </div>

        <div className="drawer-side z-20">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="flex min-h-full flex-col w-64 bg-base-200 text-base-content">
            <div className="p-4 flex items-center justify-center h-20 bg-primary text-primary-content">
              <Link
                to="/"
                className="text-2xl font-bold font-heading flex items-center gap-2"
              >
                <img src={logo} alt="Logo" className="w-full" />
              </Link>
            </div>

            <ul className="menu w-full grow p-4 text-base font-medium">
              <li>
                <NavLink to="/" className="text-base-content">
                  <FaHome /> Main Homepage
                </NavLink>
              </li>

              <div className="divider text-sm opacity-60 m-0">STUDENT MENU</div>

              {studentNavLinks.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-base-content ${
                        isActive
                          ? "active bg-primary text-primary-content hover:bg-primary"
                          : "hover:bg-base-300"
                      }`
                    }
                  >
                    <item.icon /> {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Sidebar Footer/Logout */}
            <div className="p-4 border-t border-base-300">
              <button
                onClick={handleLogout}
                className="btn btn-error btn-outline w-full text-error hover:text-white"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
