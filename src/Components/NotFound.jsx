import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
// import notFoundAnimation from "../../assets/lottie/404-astronaut.json";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 dark:from-gray-900 dark:to-black flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-2xl mx-auto">
        {/* Lottie Animation */}
        <Lottie
        //   animationData={notFoundAnimation}
          loop={true}
          style={{ width: 400, height: 400 }}
          className="mx-auto"
        />

        {/* Text */}
        <h1 className="text-8xl font-bold text-amber-600 mb-4">404</h1>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
          The wisdom you're looking for has drifted into the cosmos...
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn btn-lg bg-amber-600 hover:bg-amber-700 text-white border-none shadow-xl"
          >
            Back to Home
          </Link>
          <Link
            to="/public-lessons"
            className="btn btn-lg btn-outline border-2 hover:bg-amber-600 hover:text-white hover:border-amber-600 shadow-xl"
          >
            Explore Lessons
          </Link>
        </div>

        {/* Fun Quote */}
        <p className="text-gray-500 dark:text-gray-400 mt- mt-12 italic text-lg">
          "Not all those who wander are lost." – J.R.R. Tolkien
        </p>
      </div>
    </div>
  );
};

export default NotFound;