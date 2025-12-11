import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaMoon, FaSun, FaLeaf } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const NavBar = () => {
  const { user, signOutUser } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Theme Toggle
  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Logout with SweetAlert2
  const handleLogOut = () => {
    Swal.fire({
      title: "Logging out...",
      text: "See you soon!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    }).then(() => {
      signOutUser().catch((err) => console.error(err));
    });
  };

  // Navigation Links – Super Clean (no inline className logic)
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/public-lessons">Public Lessons</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/dashboard/add-lesson">Add Lesson</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-lessons">My Lessons</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-lg sticky top-0 z-50 shadow-md border-b border-gray-200 dark:border-gray-800">
      {/* Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-10 p-4 shadow bg-base-100 rounded-box w-64 gap-3">
            {navLinks}
            <li className="border-t pt-3">
              <button
                onClick={handleThemeToggle}
                className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-base-200"
              >
                {theme === "light" ? <>Dark Mode</> : <>Light Mode</>}
              </button>
            </li>
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-xl">
            <FaLeaf className="w-8 h-8 text-amber-600" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent hidden sm:block">
            Digital Life Lessons
          </span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6 text-lg font-medium">
          {navLinks}
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="p-2.5 rounded-full hover:bg-base-200 transition"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <FaMoon className="w-5 h-5" />
          ) : (
            <FaSun className="w-5 h-5 text-yellow-400" />
          )}
        </button>

        {/* Auth Buttons or Avatar */}
        {!user ? (
          <div className="flex gap-3">
            <Link to="/login" className="btn btn-outline btn-sm">
              Login
            </Link>
            <Link
              to="/register"
              className="btn bg-amber-600 hover:bg-amber-700 text-white border-none btn-sm"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar online ring-2 ring-amber-500 ring-offset-2 rounded-full cursor-pointer"
            >
              <div className="w-11 rounded-full">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co.com/0s3Z9kL/profile-avatar.jpg"
                  }
                  alt="User"
                />
              </div>
            </div>

            <ul className="dropdown-content menu p-4 shadow-lg bg-base-100 rounded-box w-64 mt-4 z-20 border">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="font-bold">{user?.displayName || "User"}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/dashboard/profile">Profile</Link>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="text-red-500 hover:bg-red-50 rounded-lg text-left w-full py-2.5"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
