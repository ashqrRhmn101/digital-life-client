import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading";

const AdminHome = () => {
  const { isAdmin, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // console.log(stats)

  if (loading) return <Loading />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return (
    <div className="p-8">
      <h2
        data-aos="fade-up"
        className="text-5xl font-bold text-center bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-12"
      >
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Total Users", value: stats.totalUsers, icon: "Users" },
          { label: "Total Lessons", value: stats.totalLessons, icon: "Book" },
          { label: "Premium Users", value: stats.premiumUsers, icon: "Star" },
          {
            label: "Reported Lessons",
            value: stats.reportedCount,
            icon: "Flag",
          },
        ].map((item, i) => (
          <div
            key={i}
            data-aos="zoom-in"
            data-aos-delay={i * 100}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl py-8 text-center border border-amber-200 dark:border-amber-800"
          >
            <div className="text-6xl mb-4 text-amber-600">{item.icon}</div>
            <p className="text-4xl font-bold text-gray-800 dark:text-white">
              {item.value || 0}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
