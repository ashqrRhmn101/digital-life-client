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
// console.log(contributors)
  return (
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
        Top Contributors This Week
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
        {contributors.map((user, i) => (
          <div
            data-aos="flip-left"
            data-aos-delay={i * 150}
            key={user._id}
            className="text-center"
          >
            <img
              src={user.photo} 
              alt={user.name}
              className="w-32 h-32 rounded-full ring-8 ring-amber-500 shadow-2xl mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-gray-600 dark:text-gray-300">{user.name}</h3>
            <p className="text-amber-600 font-bold text-2xl">
               <span className="badge badge-lg badge-warning text-xl py-4 px-8">{user.accessLevel}</span>
            </p>
            {/* <p className="text-amber-600 font-bold text-2xl">
              Lessons {user.lessonsCount}  👉 totalLessons
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributors;
