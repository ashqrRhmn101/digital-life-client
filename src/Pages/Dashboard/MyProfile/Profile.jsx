import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { FaStar, FaEdit } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import LessonCard from "../../PublicLessons/LessonCard";

const Profile = () => {
  const { user, userProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["profile", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/user", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  const { data: publicLessons = [] } = useQuery({
    queryKey: ["public-lessons-user", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons", {
        params: { email: user.email, visibility: "public" },
      });
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ name, photoURL }) => {
      // update firebase
      await userProfile({ displayName: name, photoURL });
      // update backend
      await axiosSecure.patch("/users", { name, photoURL });
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Profile updated successfully", "success");
      setEditing(false);
      queryClient.invalidateQueries(["profile"]);
    },
  });

  const { register, handleSubmit } = useForm({
    defaultValues: { name: profile.name, photo: "" },
  });

  const onUpdate = async (data) => {
    let photoURL = profile.photoURL;
    if (data.photo[0]) {
      const formData = new FormData();
      formData.append("image", data.photo[0]);
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`,
        formData
      );
      photoURL = imgRes.data.data.url;
    }
    mutation.mutate({ name: data.name, photoURL });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <h2
        data-aos="fade-up"
        className="text-4xl font-bold text-center bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent mb-8"
      >
        My Profile
      </h2>

      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-12"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={profile.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full ring-4 ring-amber-500 shadow-lg"
          />
          <div className="flex-grow">
            <h3 className="text-3xl font-bold">{profile.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>
            {profile.isPremium && (
              <span className="badge badge-warning text-lg mt-2">
                <FaStar /> Premium
              </span>
            )}
            <div className="flex gap-4 mt-4">
              <p>Lessons Created: {profile.totalLessons || 0}</p>
              <p>Lessons Saved: {profile.totalFavorites || 0}</p>
            </div>
          </div>
          <button onClick={() => setEditing(true)} className="btn btn-outline">
            <FaEdit /> Edit
          </button>
        </div>

        {editing && (
          <form
            data-aos="zoom-in"
            onSubmit={handleSubmit(onUpdate)}
            className="mt-8 space-y-4"
          >
            <input
              type="text"
              {...register("name")}
              className="input input-bordered w-full"
              placeholder="New Name"
            />
            <input
              type="file"
              {...register("photo")}
              className="file-input file-input-bordered w-full"
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="btn bg-amber-600 text-white flex-1"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <h3
        data-aos="fade-up"
        data-aos-delay="200"
        className="text-3xl font-bold text-center mb-6"
      >
        My Public Lessons
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publicLessons.map((lesson, index) => (
          <div data-aos="fade-up" data-aos-delay={index * 100} key={lesson._id}>
            <LessonCard lesson={lesson} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
