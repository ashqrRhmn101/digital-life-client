import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";


const MyFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [toneFilter, setToneFilter] = useState("all");

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["my-favorites", user.email, categoryFilter, toneFilter],
    queryFn: async () => {
      const res = await axiosSecure.get("/favorites", { params: { email: user.email, category: categoryFilter, tone: toneFilter } });
      return res.data;
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/favorites/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Removed!", "Lesson removed from favorites", "success");
      queryClient.invalidateQueries(["my-favorites"]);
    },
  });

  if (isLoading) return <Loading/>;

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <h2 data-aos="fade-up" className="text-4xl font-bold text-center bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent mb-8">
        My Favorites
      </h2>

      {/* Filters */}
      <div data-aos="fade-down" className="flex gap-4 mb-8 justify-center">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="select select-bordered">
          <option value="all">All Categories</option>
          <option>Personal Growth</option>
          <option>Career</option>
          <option>Relationships</option>
          <option>Mindset</option>
          <option>Mistakes Learned</option>
        </select>
        <select value={toneFilter} onChange={(e) => setToneFilter(e.target.value)} className="select select-bordered">
          <option value="all">All Tones</option>
          <option>Motivational</option>
          <option>Sad</option>
          <option>Realization</option>
          <option>Gratitude</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Creator</th>
              <th>Category</th>
              <th>Tone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((fav, index) => (
              <tr data-aos="fade-up" data-aos-delay={index * 100} key={fav._id}>
                <td>{fav.title}</td>
                <td>{fav.creatorName}</td>
                <td>{fav.category}</td>
                <td>{fav.emotionalTone}</td>
                <td className="flex gap-2">
                  <Link to={`/lesson/${fav.lessonId}`} className="btn btn-sm btn-info">Details</Link>
                  <button onClick={() => removeMutation.mutate(fav._id)} className="btn btn-sm btn-error"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavorites;