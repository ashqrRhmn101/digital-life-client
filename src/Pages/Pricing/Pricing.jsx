import React from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const Pricing = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to upgrade to Premium",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: "/pricing" } });
        }
      });
      return;
    }

    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        email: user.email,
        userId: user.uid,
      });

      window.location.href = res.data.url;
    } catch (error) {
      Swal.fire("Error", "Failed to start payment", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-black dark:to-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <div data-aos="fade-up">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            One-time payment. Lifetime access. No subscriptions.
          </p>
          </h1>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:max-w-5xl mx-auto mt-16">

          {/* Free Plan */}
          <div
            data-aos="zoom-in"
            data-aos-delay="100"
            className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl p-10 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Free</h3>
            <p className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
              ৳0
              <span className="text-lg font-normal text-gray-500">/forever</span>
            </p>

            <ul className="space-y-4 text-left text-gray-700 dark:text-gray-300 mt-8">
              <li>Unlimited public free lessons</li>
              <li>Create unlimited free lessons</li>
              <li>Like & save lessons</li>
              <li>Basic community access</li>
              <li>Ads supported</li>
            </ul>

            <button className="btn btn-outline btn-lg w-full mt-10" disabled>
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div
            data-aos="zoom-in"
            data-aos-delay="300"
            className="relative bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl shadow-2xl p-10 text-white border-4 border-amber-300 dark:border-amber-700 transform scale-105"
          >
            {/* Badge */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <span className="bg-red-600 text-white px-sm font-bold px-6 py-2 rounded-full shadow-lg">
                MOST POPULAR
              </span>
            </div>

            <div className="text-white">
              <h3 className="text-4xl font-bold mb-4">Premium</h3>
              <p className="text-6xl font-extrabold mb-2">
                ৳1500
                <span className="text-xl font-normal opacity-90">/lifetime</span>
              </p>
              <p className="text-2xl opacity-90 mb-8">One-time payment only!</p>

              <ul className="space-y-4 text-left mb-10">
                <li>All Free features</li>
                <li>Access ALL premium lessons</li>
                <li>Create premium lessons</li>
                <li>No ads — clean experience</li>
                <li>Priority in search & explore</li>
                <li>Premium badge on profile</li>
                <li>Early access to new features</li>
              </ul>

              <button
                onClick={handleUpgrade}
                className="btn btn-lg w-full bg-white text-amber-600 hover:bg-white/90 hover:scale-105 transform transition shadow-xl text-xl font-bold"
              >
                {loading ? "Processing..." : "Upgrade to Lifetime Premium"}
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div data-aos="fade-up" data-aos-delay="500" className="mt-20">
          <p className="text-gray-600 dark:text-gray-400 mb-6">Trusted by thousands of wisdom seekers</p>
          <div className="flex justify-center gap-12 flex-wrap">
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-600">10K+</p>
              <p className="text-gray-600 dark:text-gray-400">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-600">50K+</p>
              <p className="text-gray-600 dark:text-gray-400">Lessons Shared</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-600">1M+</p>
              <p className="text-gray-600 dark:text-gray-400">Lives Touched</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;