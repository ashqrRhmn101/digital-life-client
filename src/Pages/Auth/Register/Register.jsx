import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../../SocialLogin/SocialLogin";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
  const { registerUser, userProfile } = useAuth();
  useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Create Firebase User
      const result = await registerUser(data.email, data.password);
      console.log("Firebase user created:", result.user);

      // Upload Image to ImgBB
      const imageFile = data.photo[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`,
        formData
      );
      const photoURL = imgRes.data.data.url;

      // Update Firebase Profile
      await userProfile({ displayName: data.name, photoURL });

      // Save User to MongoDB (role + isPremium)
      await axiosSecure.put("/users", {
        name: data.name,
        email: data.email,
        photoURL,
        role: "user",
        isPremium: false,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      });

      Swal.fire({
        icon: "success",
        title: "Welcome aboard!",
        text: "Account created successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      navigate(location.state?.from || "/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-black px-4 py-12">
      <div data-aos="fade-up" data-aos-delay="100" className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-amber-200 dark:border-amber-800">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent mb-2">
            Join Digital Life Lessons
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Start preserving your wisdom today
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="label font-medium">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full bg-white/50 dark:bg-gray-700"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Photo */}
            <div>
              <label className="label font-medium">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: "Photo is required" })}
                className="file-input file-input-bordered w-full bg-white/50 dark:bg-gray-700"
              />
              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>

            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="label font-medium">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message: "Must have uppercase & lowercase letter",
                  },
                })}
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
              disabled={loading}
              className="btn btn-lg w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-none shadow-lg"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location.state}
              className="font-bold text-amber-600 hover:underline"
            >
              Login here
            </Link>
          </p>

          <div className="divider my-8 text-gray-500">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
