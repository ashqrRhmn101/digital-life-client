import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const TopContributors = () => {
  const axiosSecure = useAxiosSecure();

  const { data: contributors = [] } = useQuery({
    queryKey: ["top-contributors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/top-contributors"); 
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
        Top Contributors This Week
      </h2>
      <div className="flex flex-wrap justify-center gap-12">
        {contributors.map((user, i) => (
          <div
            data-aos="flip-left"
            data-aos-delay={i * 150}
            key={user._id}
            className="text-center"
          >
            <img
              src={user.photoURL}
              alt={user.name}
              className="w-32 h-32 rounded-full ring-8 ring-amber-500 shadow-2xl mx-auto mb-4"
            />
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-amber-600 font-bold text-2xl">
              {user.lessonsCount} Lessons
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributors;
