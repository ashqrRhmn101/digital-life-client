import React from "react";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-black flex items-center justify-center px-4">
      <div
        data-aos="fade-up"
        className="text-center bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 max-w-lg mx-auto"
      >
        <div className="text-8xl mb-6">Oops!</div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
          No worries! You can try upgrading again anytime.
        </p>
        <div className="space-y-4">
          <Link
            to="/pricing"
            className="btn btn-lg bg-amber-600 text-white w-full"
          >
            Try Again
          </Link>
          <Link to="/dashboard" className="btn btn-outline btn-lg w-full">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
