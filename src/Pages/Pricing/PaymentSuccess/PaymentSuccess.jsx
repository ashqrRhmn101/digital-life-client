import React, { useEffect } from "react";
import { Link } from "react-router";
import Confetti from "react-confetti";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const PaymentSuccess = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("session_id");
    if (!sessionId) return;

    axiosSecure
      .post("/verify-payment", { sessionId, email: user?.email })
      .then(() => {
        Swal.fire("Success!", "Your account is now Premium!", "success");
      });
  }, [axiosSecure, user?.email]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-black flex items-center justify-center px-4">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
      />

      <div
        data-aos="zoom-in"
        className="text-center bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 max-w-lg mx-auto border border-amber-300"
      >
        <div className="md:text-6xl text-4xl mb-6 text-white">Congratulations!</div>
        <h1 className="text-4xl font-bold text-amber-600 mb-4">
          Welcome to Premium!
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
          You now have lifetime access to all premium lessons and features.
        </p>
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="btn btn-lg bg-amber-600 text-white w-full"
          >
            Go to Dashboard
          </Link>
          <Link to="/public-lessons" className="btn btn-outline btn-lg w-full text-white hover:bg-amber-500">
            Explore Premium Lessons
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
