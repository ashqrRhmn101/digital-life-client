import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LessonCard from "../../PublicLessons/LessonCard";

const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: featured = [], isLoading } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons?featured=true");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading featured lessons...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
        Featured Life Lessons ⭐
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((lesson, i) => (
          <div data-aos="fade-up" data-aos-delay={i * 100} key={lesson._id}>
            <LessonCard lesson={lesson} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedLessons;
