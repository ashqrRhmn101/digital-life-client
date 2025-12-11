import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddLesson = () => {
  const { user, isPremium } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (lessonData) => {
      return await axiosSecure.post("/lessons", lessonData);
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Lesson Added!",
        timer: 2000,
      });
      reset();
      navigate("/dashboard/my-lessons");
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Failed to add lesson",
        text: err.message,
      });
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let photoURL = "";
      if (data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_host_key
          }`,
          formData
        );
        photoURL = imgRes.data.data.url;
      }

      const lessonData = {
        title: data.title,
        description: data.description,
        category: data.category,
        emotionalTone: data.emotionalTone,
        featuredImage: photoURL,
        visibility: data.visibility,
        accessLevel: data.accessLevel,
        creatorName: user.displayName,
        creatorPhoto: user.photoURL,
        creatorEmail: user.email,
        createdAt: new Date().toISOString(),
        likes: 0,
        saveCount: 0,
        views: 0,
      };

      mutation.mutate(lessonData);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div
        data-aos="fade-up"
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-amber-200 dark:border-amber-800"
      >
        <h2
          data-aos="zoom-in"
          className="text-4xl font-bold text-center bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent mb-8"
        >
          Add New Life Lesson
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div data-aos="fade-right" data-aos-delay="100">
            <label className="label font-medium">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full"
              placeholder="Enter lesson title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div data-aos="fade-left" data-aos-delay="200">
            <label className="label font-medium">Full Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="textarea textarea-bordered w-full h-40"
              placeholder="Share your story or insight..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category Dropdown */}
          <div data-aos="fade-right" data-aos-delay="300">
            <label className="label font-medium">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              <option>Personal Growth</option>
              <option>Career</option>
              <option>Relationships</option>
              <option>Mindset</option>
              <option>Mistakes Learned</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Emotional Tone Dropdown */}
          <div data-aos="fade-left" data-aos-delay="400">
            <label className="label font-medium">Emotional Tone</label>
            <select
              {...register("emotionalTone", {
                required: "Emotional tone is required",
              })}
              className="select select-bordered w-full"
            >
              <option value="">Select Tone</option>
              <option>Motivational</option>
              <option>Sad</option>
              <option>Realization</option>
              <option>Gratitude</option>
            </select>
            {errors.emotionalTone && (
              <p className="text-red-500 text-sm">
                {errors.emotionalTone.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div data-aos="fade-right" data-aos-delay="500">
            <label className="label font-medium">
              Featured Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Visibility Dropdown */}
          <div data-aos="fade-left" data-aos-delay="600">
            <label className="label font-medium">Visibility</label>
            <select
              {...register("visibility", {
                required: "Visibility is required",
              })}
              className="select select-bordered w-full"
            >
              <option>Public</option>
              <option>Private</option>
            </select>
            {errors.visibility && (
              <p className="text-red-500 text-sm">
                {errors.visibility.message}
              </p>
            )}
          </div>

          {/* Access Level Dropdown */}
          <div data-aos="fade-right" data-aos-delay="700">
            <label className="label font-medium">Access Level</label>
            <Tippy
              content={
                !isPremium ? "Upgrade to Premium to create premium lessons" : ""
              }
            >
              <select
                {...register("accessLevel", {
                  required: "Access level is required",
                })}
                disabled={!isPremium}
                className={`select select-bordered w-full ${
                  !isPremium ? "select-disabled cursor-not-allowed" : ""
                }`}
              >
                <option>Free</option>
                <option disabled={!isPremium}>Premium</option>
              </select>
            </Tippy>
            {errors.accessLevel && (
              <p className="text-red-500 text-sm">
                {errors.accessLevel.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || mutation.isLoading}
            data-aos="zoom-in"
            data-aos-delay="800"
            className="btn btn-lg w-full bg-amber-600 hover:bg-amber-700 text-white border-none shadow-xl"
          >
            {loading || mutation.isLoading ? "Adding..." : "Add Lesson"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
