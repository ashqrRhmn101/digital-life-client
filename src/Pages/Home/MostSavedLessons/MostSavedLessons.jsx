import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LessonCard from "../../PublicLessons/LessonCard";
import Loading from "../../../Components/Loading";

const MostSavedLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["most-saved-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons?sort=mostSaved&limit=6");
      return res.data.lessons;
    },
  });

  if (isLoading) return <Loading/>;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
        Most Saved Lessons 🔖
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lessons.map((lesson, i) => (
          <div data-aos="fade-up" data-aos-delay={i * 100} key={lesson._id}>
            <LessonCard lesson={lesson} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostSavedLessons;