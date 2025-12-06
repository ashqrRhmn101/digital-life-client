import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
// import useAuth from "../../Hooks/useAuth";
// import SocialLogin from "./SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = async (data) => {
    try {
      const profileImg = data.file[0];

      // 1️⃣ Create Account (Firebase)
      const result = await registerUser(data.email, data.password);
      console.log("User created:", result.user);

      // 2️⃣ Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", profileImg);

      const imgURL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const res = await axios.post(imgURL, formData);
      const photoURL = res.data.data.url;

      // 3️⃣ Update Firebase User Profile
      const userProfileData = {
        displayName: data.name,
        photoURL: photoURL,
      };

      await userProfile(userProfileData);
      console.log("User profile updated");

      // 4️⃣ Redirect
      navigate(location.state || "/");
    } catch (error) {
      console.error("Registration Error:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow rounded-lg bg-white">
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset>
          <h2 className="text-2xl font-bold mb-1">Create an Account</h2>
          <p className="text-gray-600 mb-4">Register with ZapShift</p>

          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

          {/* Photo */}
          <label className="label mt-3">Photo</label>
          <input
            type="file"
            {...register("file", { required: true })}
            className="file-input file-input-bordered w-full"
          />
          {errors.file && <p className="text-red-500 text-sm">Photo is required</p>}

          {/* Email */}
          <label className="label mt-3">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

          {/* Password */}
          <label className="label mt-3">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/,
            })}
            className="input input-bordered w-full"
            placeholder="Password"
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

          {/* Submit Button */}
          <button className="btn btn-primary w-full mt-4">Register</button>

          <p className="text-sm text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" state={location.state} className="text-blue-600">
              Login
            </Link>
          </p>
        </fieldset>
      </form>

      <div className="mt-4">
        {/* <SocialLogin /> */}
      </div>
    </div>
  );
};

export default Register;
