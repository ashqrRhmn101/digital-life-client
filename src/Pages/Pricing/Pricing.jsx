import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  X,
  Crown,
  Sparkles,
  Lock,
  Unlock,
  Zap,
} from "lucide-react";
// import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Pricing = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  // Demo: Simulate logged in user (Replace with your auth context)
  useEffect(() => {
    const demoUser = {
      uid: "demo123",
      email: "user@example.com",
      displayName: "John Doe",
      isPremium: false,
    };
    // setUser(demoUser);
    setIsPremium(demoUser.isPremium);
  }, []);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      // Call your backend route
      const response = await axiosSecure.post("/create-checkout-session", {
        userId: user.uid,
        email: user.email,
        priceId: "price_xxx",
      });

      // Redirect to Stripe Checkout
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Failed to start checkout. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      name: "Life Lessons Creation",
      free: "5 lessons/month",
      premium: "Unlimited lessons",
      icon: "📝",
    },
    {
      name: "Premium Lesson Creation",
      free: "Not Available",
      premium: "Create & Monetize",
      icon: "💎",
    },
    {
      name: "Public Lesson Access",
      free: "Free lessons only",
      premium: "All Premium + Free",
      icon: "🔓",
    },
    {
      name: "Ad-Free Experience",
      free: "With Ads",
      premium: "Completely Ad-Free",
      icon: "🚫",
    },
    {
      name: "Priority Listing",
      free: "Standard",
      premium: "Featured Placement",
      icon: "⭐",
    },
    {
      name: "Advanced Analytics",
      free: "Basic Stats",
      premium: "Detailed Insights",
      icon: "📊",
    },
    {
      name: "Export Lessons",
      free: "Not Available",
      premium: "PDF Export",
      icon: "📄",
    },
    {
      name: "Lifetime Access",
      free: "Free Forever",
      premium: "One-time Payment",
      icon: "♾️",
    },
  ];

  // If user is already Premium
  if (isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-amber-400">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mb-6">
              <Crown className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              You're Already Premium! ⭐
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Enjoy unlimited access to all premium features and lessons.
            </p>
            <div className="bg-gradient-to-r from-amber-100 to-purple-100 rounded-2xl p-6 mb-6">
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-purple-600">
                Lifetime Premium Member
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>One-Time Payment • Lifetime Access</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Upgrade to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-purple-600">
              Premium
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock unlimited wisdom creation and access exclusive premium life
            lessons from our community
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden  mb-12">
          <div className="grid grid-cols-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <div className="p-6">
              <h3 className="text-2xl font-bold">Features</h3>
            </div>
            <div className="p-6 border-l border-gray-700">
              <div className="flex items-center gap-2">
                <Unlock className="w-6 h-6 text-gray-400" />
                <h3 className="text-2xl font-bold">Free Plan</h3>
              </div>
              <p className="text-gray-400 text-sm mt-1">৳0 Forever</p>
            </div>
            <div className="p-6 border-l border-amber-500 bg-gradient-to-r from-amber-500 to-amber-600">
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6" />
                <h3 className="text-2xl font-bold">Premium</h3>
              </div>
              <p className="text-amber-100 text-sm mt-1">৳1,500 One-Time</p>
            </div>
          </div>

          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-3 ${
                idx % 2 === 0 ? "bg-gray-50" : "bg-white"
              } transition-colors hover:bg-blue-50`}
            >
              <div className="p-6 flex items-center gap-3 font-semibold text-gray-800">
                <span className="text-2xl">{feature.icon}</span>
                <span>{feature.name}</span>
              </div>
              <div className="p-6 border-l border-gray-200 flex items-center">
                <span className="text-gray-600">{feature.free}</span>
              </div>
              <div className="p-6 border-l border-amber-200 bg-amber-50 bg-opacity-30 flex items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-800">
                    {feature.premium}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full mb-6">
              <Zap className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Unlock Everything?
            </h2>
            <p className="text-xl mb-2 text-amber-100">
              One-time payment of ৳1,500 for lifetime premium access
            </p>
            <p className="text-amber-100 mb-8">
              No monthly fees • Cancel anytime • Full refund within 14 days
            </p>

            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="group relative inline-flex items-center gap-3 bg-white text-amber-600 px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Crown className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                  <span>Upgrade to Premium Now</span>
                  <Sparkles className="w-7 h-7 group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>

            <p className="text-sm text-amber-100 mt-6">
              🔒 Secure payment powered by Stripe • Money-back guarantee
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-amber-600 mb-2">2,847+</div>
            <div className="text-gray-600 text-sm">Premium Members</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              15,000+
            </div>
            <div className="text-gray-600 text-sm">Premium Lessons</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
            <div className="text-gray-600 text-sm">User Rating</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600 text-sm">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
