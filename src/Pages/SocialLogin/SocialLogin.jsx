import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      const loggedUser = result.user;

      // Prepare user data for MongoDB
      const userInfo = {
        name: loggedUser.displayName || "User",
        email: loggedUser.email,
        photoURL:
          loggedUser.photoURL || "https://i.ibb.co/0s3Z9kL/profile-avatar.jpg",
        role: "user",
        isPremium: false,
        createdAt: new Date(),
        lastLoginAt: new Date(),
      };

      // Upsert user in MongoDB (create if not exists)
      await axiosSecure.put("/users", userInfo); // PUT better for upsert

      // Success Toast with AOS feel
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: `Logged in as ${
          loggedUser.displayName?.split(" ")[0] || "Friend"
        }`,
        timer: 2000,
        showConfirmButton: false,
        position: "top-end",
        background: "#fff",
        customClass: {
          popup: "animate__animated animate__fadeInDown",
        },
      });

      // Redirect
      navigate(location.state?.from || "/dashboard");
    } catch (error) {
      console.error("Google Login Error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Google sign-in failed. Please try again.",
        timer: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="divider text-gray-500 dark:text-gray-400 my-8">OR</div>

      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        data-aos="zoom-in"
        data-aos-delay="200"
        className="btn btn-lg w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-amber-500 hover:shadow-xl transition-all duration-300 shadow-lg group"
      >
        {loading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <>
            <FcGoogle className="text-2xl group-hover:scale-110 transition" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Continue with Google
            </span>
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        Secure login powered by Google
      </p>
    </div>
  );
};

export default SocialLogin;
