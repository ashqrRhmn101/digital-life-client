import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaMoon, FaSun } from "react-icons/fa";

const NavBar = () => {


    // Theme setup
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () =>
    setTheme(theme === "light" ? "dark" : "light");

     const links = (
    <>
      <li>
        <NavLink to="/"></NavLink>
      </li>
      <li>
        <NavLink to="/"></NavLink>
      </li>
      <li>
        <NavLink to="/"></NavLink>
      </li>
      {/* <li>
        <NavLink to="/"></NavLink>
      </li> */}
      <li>
        <NavLink to="/"></NavLink>
      </li>
      <li>
        <NavLink to="/"></NavLink>
      </li>
      {/* <li>
        <NavLink to="/"></NavLink>
      </li>
      <li>
        <NavLink to="/"></NavLink>
      </li> */}
      {/* {
        user && <>
            <li><NavLink to='/dashboard/'></NavLink></li>
        </>
      } */}
    </>
  );


  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
             {links}

              {/* Dark/Light Toggle for Mobile */}
            <li className="mt-3">
              <button
                onClick={handleThemeToggle}
                className="flex items-center justify-center gap-2 text-sm font-medium"
              >
                {theme === "light" ? (
                  <>
                    <FaMoon className="text-lg text-gray-500" />
                  </>
                ) : (
                  <>
                    <FaSun className="text-lg text-yellow-400" />
                  </>
                )}
              </button>
            </li>

            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}

          </ul>
        </div>
        {/* Button */}
        <div className="navbar-end flex items-center gap-3">

            {/* Theme Toggle (Desktop) */}
        <button
          onClick={handleThemeToggle}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-base-200 transition"
        >
          {theme === "light" ? (
            <FaMoon className="text-lg text-gray-600" />
          ) : (
            <FaSun className="text-lg text-yellow-400" />
          )}
        </button>

            {/* User register / login button */}
          {/* {user ? (
            <Link onClick={handleSignOut} to="/" className="btn">
              Logout
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn">
                Sign In
              </Link>
              <Link to="/register" className="btn ">
                Be a rider
              </Link>
            </>
          )} */}
        </div>

        {/* Profile  */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
