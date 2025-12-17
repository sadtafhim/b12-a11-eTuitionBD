import React from "react";
import {
  FaGraduationCap,
  FaPenSquare,
  FaUsers,
  FaCreditCard,
  FaUser,
  FaHome,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaChartLine,
  FaBoxes,
  FaTasks,
  FaFileInvoiceDollar,
  FaClipboardList,
} from "react-icons/fa";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import logo from "../../assets/logo.png";

/* ---------------- NAVIGATION DATA ---------------- */

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
  {
    path: "/dashboard/user-management",
    icon: FaUsers,
    label: "User Management",
  },
];

const tutorNavLinks = [
  {
    path: "/dashboard/all-tuitions",
    icon: FaClipboardList,
    label: "All Tuitions",
  },
  {
    path: "/dashboard/my-applications",
    icon: FaBoxes,
    label: "My Applications",
  },
  {
    path: "/dashboard/ongoing-tuitions",
    icon: FaTasks,
    label: "Ongoing Tuitions",
  },
  {
    path: "/dashboard/revenue-history",
    icon: FaChartLine,
    label: "Revenue History",
  },
  { path: "/dashboard/profile", icon: FaUser, label: "Profile Settings" },
];

const adminNavLinks = [
  {
    path: "/dashboard/user-management",
    icon: FaUsers,
    label: "User Management",
  },
  {
    path: "/dashboard/tuition-management",
    icon: FaChalkboardTeacher,
    label: "Tuition Management",
  },
  {
    path: "/dashboard/reports-analytics",
    icon: FaFileInvoiceDollar,
    label: "Reports & Analytics",
  },
  { path: "/dashboard/profile", icon: FaUser, label: "Profile Settings" },
];

const DashboardLayout = () => {
  const { user, logOut, loading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  /* ---------- AUTH GUARD ---------- */
  if (!user && !authLoading) {
    navigate("/auth/login");
    return null;
  }

  /* ---------- FETCH USER FROM DB ---------- */
  const {
    data: dbUserData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
  } = useQuery({
    queryKey: ["dbUserData", user?.email],
    enabled: !!user?.email && !authLoading,
    staleTime: 1000 * 60 * 10,
    queryFn: async () => {
      if (!user?.email) return null;

      const res = await axiosSecure.get(`/users?email=${user.email}`);

      if (!res.data || Object.keys(res.data).length === 0) {
        return { role: "student", email: user.email };
      }

      return res.data;
    },
  });
  console.log(dbUserData);

  /* ---------- ROLE LOGIC ---------- */
  const finalUser = dbUserData || user;
  const userRole = finalUser?.role || "student";

  let navLinks = studentNavLinks;
  let menuTitle = "STUDENT MENU";

  if (userRole === "tutor") {
    navLinks = tutorNavLinks;
    menuTitle = "TUTOR MENU";
  } else if (userRole === "admin") {
    navLinks = adminNavLinks;
    menuTitle = "ADMIN MENU";
  }

  /* ---------- HELPERS ---------- */
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  const getCurrentPageTitle = () => {
    const allLinks = [...studentNavLinks, ...tutorNavLinks, ...adminNavLinks];
    const active = allLinks.find((link) =>
      location.pathname.startsWith(link.path)
    );

    if (active) return active.label;
    if (location.pathname === "/dashboard") return "Dashboard Overview";

    return `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard`;
  };

  /* ---------- LOADING / ERROR ---------- */
  if (authLoading || isUserDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="ml-3 text-lg">
          {authLoading ? "Authenticating User..." : "Fetching User Data..."}
        </p>
      </div>
    );
  }

  if (isUserDataError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl text-error">Failed to Load Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-error mt-4">
          Logout
        </button>
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen">
        <nav className="navbar bg-base-300 sticky top-0 z-10">
          <div className="flex-1 px-4 text-xl font-bold">
            {getCurrentPageTitle()}
          </div>
          <div className="flex items-center gap-3 px-4">
            <span>{finalUser?.displayName || finalUser?.email}</span>
            <div className="avatar w-10 rounded-full">
              <img src={finalUser?.photoURL || logo} alt="avatar" />
            </div>
          </div>
        </nav>

        <main className="p-6 grow">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="w-64 bg-base-200 flex flex-col">
          <Link to="/" className="p-4 bg-primary">
            <img src={logo} alt="logo" />
          </Link>

          <ul className="menu p-4 grow">
            <li>
              <NavLink to="/">
                <FaHome /> Main Homepage
              </NavLink>
            </li>

            <div className="divider">{menuTitle}</div>

            {navLinks.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path}>
                  <item.icon /> {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button onClick={handleLogout} className="btn btn-error m-4">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
