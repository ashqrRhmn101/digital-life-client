import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import Confetti from "react-confetti";
import useAuth from "../../../Hooks/useAuth";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { user } = useAuth();

  useEffect(() => {
    if (sessionId) {
      // Optional: verify session on backend
      console.log("Payment successful! Session ID:", sessionId);
    }
  }, [sessionId]);

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
        <div className="text-8xl mb-6">Congratulations!</div>
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
          <Link to="/public-lessons" className="btn btn-outline btn-lg w-full">
            Explore Premium Lessons
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
