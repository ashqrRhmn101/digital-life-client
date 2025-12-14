import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaPlus,
  FaBook,
  FaStar,
  FaUser,
  FaUsers,
  FaListAlt,
  FaFlag,
  FaShieldAlt,
  FaLeaf,
} from "react-icons/fa";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const { isAdmin, isPremium, user } = useAuth();
  //   const isAdmin = user?.role === "admin";

  return (
    <div
      className="drawer lg:drawer-open min-h-screen bg-base-100"
      data-aos="fade-down"
    >
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar bg-base-300 shadow-md">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
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
          <div className="flex-1 px-2 mx-2 text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-xl">
                <FaLeaf className="w-8 h-8 text-amber-600" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent hidden sm:block">
                Digital Life Lessons Dashboard
              </span>
            </Link>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Desktop quick links if needed */}
            </ul>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-8 flex-grow">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-200 text-base-content space-y-2">
          <div className="flex-1 px-2 mx-2 text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-xl">
                <FaLeaf className="w-8 h-8 text-amber-600" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent hidden sm:block">
                Back To Home
              </span>
            </Link>
          </div>
          <div className="p-4 pb-7 border-b border-gray-300">
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL}
                alt="User"
                className="w-12 h-12 rounded-full ring-2 ring-amber-500"
              />
              <div className="space-y-1">
                <p className="font-bold">{user?.displayName}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
                {(user && isPremium && (
                  <span className="badge badge-warning">Premium ⭐</span>
                )) || (
                  <span className="badge badge-warning text-red-500 font-semibold">
                    Not Premium
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* User Dashboard Links */}
          <li>
            <NavLink
              to="/dashboard"
              className="hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-white"
            >
              <FaHome className="text-xl text-amber-600" />
              Dashboard Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-lesson"
              className="hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-white"
            >
              <FaPlus className="text-xl text-amber-600" />
              Add Lesson
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-lessons"
              className="hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-white"
            >
              <FaBook className="text-xl text-amber-600" />
              My Lessons
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-favorites"
              className="hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-white"
            >
              <FaStar className="text-xl text-amber-600" />
              My Favorites
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className="hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-white"
            >
              <FaUser className="text-xl text-amber-600" />
              Profile
            </NavLink>
          </li>

          {/* Admin Links (Conditional) */}
          {isAdmin && (
            <>
              <div className="divider my-2">Admin Panel</div>
              <li>
                <NavLink
                  to="/dashboard/admin"
                  className="hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-white"
                >
                  <FaShieldAlt className="text-xl text-red-600" />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/manage-users"
                  className="hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-white"
                >
                  <FaUsers className="text-xl text-red-600" />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/manage-lessons"
                  className="hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-white"
                >
                  <FaListAlt className="text-xl text-red-600" />
                  Manage Lessons
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/reported-lessons"
                  className="hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-white"
                >
                  <FaFlag className="text-xl text-red-600" />
                  Reported Lessons
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/profile"
                  className="hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-white"
                >
                  <FaUser className="text-xl text-red-600" />
                  Admin Profile
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
