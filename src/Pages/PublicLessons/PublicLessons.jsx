import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import LessonCard from "./LessonCard";
import { FaSearch, FaFilter } from "react-icons/fa";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [tone, setTone] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["public-lessons", search, category, tone, sort, page],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons", {
        params: { search, category, tone, sort, page, limit: 12 },
      });
      return res.data;
    },
  });

  const { lessons = [], totalPages = 1 } = data;

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-100 py-12" data-aos="fade-down">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent mb-4">
          Public Life Lessons
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          Explore wisdom shared by our community
        </p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center flex-wrap">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search lessons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full md:w-96"
            />
            <button onClick={refetch} className="btn bg-amber-600 text-white">
              <FaSearch />
            </button>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select select-bordered"
          >
            <option value="all">All Categories</option>
            <option>Personal Growth</option>
            <option>Career</option>
            <option>Relationships</option>
            <option>Mindset</option>
            <option>Mistakes Learned</option>
          </select>

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="select select-bordered"
          >
            <option value="all">All Tones</option>
            <option>Motivational</option>
            <option>Realization</option>
            <option>Gratitude</option>
            <option>Sad</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered"
          >
            <option value="newest">Newest First</option>
            <option value="mostSaved">Most Saved</option>
            <option value="mostLiked">Most Liked</option>
          </select>
        </div>

        {/* Lessons Grid */}
        {lessons.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">No lessons found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" >
            {lessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {[...Array(totalPages).keys()].map((i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`btn ${
                  page === i + 1 ? "btn-active bg-amber-600 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;
