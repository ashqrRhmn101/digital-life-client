import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/loading-spiral.json";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-black flex items-center justify-center px-4">
      <div className="text-center">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          style={{ width: 200, height: 200 }}
          className="mx-auto"
        />
        <h2 className="text-3xl font-bold text-amber-600 mt-8">Loading Wisdom...</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Please wait a moment</p>
      </div>
    </div>
  );
};

export default Loading;