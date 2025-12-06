import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const userSignIn = async (data) => {
    try {
      const result = await signInUser(data.email, data.password);
      console.log("Logged In:", result.user);

      navigate(location.state || "/");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 shadow-lg p-8 rounded-xl bg-white">
      <form onSubmit={handleSubmit(userSignIn)}>
        <fieldset>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            Welcome Back
          </h2>
          <p className="text-gray-600 mb-6">Login with Digital Life</p>

          {/* Email */}
          <label className="label font-semibold">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          {/* Password */}
          <label className="label mt-4 font-semibold">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 ,  pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/,
            })}
            className="input input-bordered w-full"
            placeholder="Enter your password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm">
              Must be at least 6 characters
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500 text-sm">
              Must include uppercase, lowercase, number & special character
            </p>
          )}

          {/* Login Button */}
          <button className="btn">
            Login
          </button>

          {/* Create Account */}
          <p className="">
            Don’t have an account?{" "}
            <Link
              to="/register"
              state={location.state}
              className=""
            >
              Register
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
