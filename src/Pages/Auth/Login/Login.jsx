import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../../SocialLogin/SocialLogin";

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [btnLoading, setBtnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setBtnLoading(true);

    try {
      const result = await signInUser(data.email, data.password);

      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(location?.state || "/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message.includes("wrong-password")
          ? "Wrong password"
          : "Invalid email or password",
      });
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-black px-4 py-12">
      <div data-aos="fade-up" className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-amber-200 dark:border-amber-800 text-white">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Continue your journey of wisdom
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="label font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full bg-white/50 dark:bg-gray-700"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="label font-medium">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="input input-bordered w-full bg-white/50 dark:bg-gray-700"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={btnLoading}
              className="btn btn-lg w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-none shadow-lg"
            >
              {btnLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
            New here?{" "}
            <Link
              to="/register"
              state={location.state}
              className="font-bold text-amber-600 hover:underline"
            >
              Create account
            </Link>
          </p>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
