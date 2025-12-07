import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AnalyticsChart from "../../Components/AnalyticsChart";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats = {} } = useQuery({
    queryKey: ["user-stats", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/user-stats", { params: { email: user.email } });
      return res.data;
    },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Welcome, {user.displayName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <div className="stat-title text-gray-800 dark:text-white">Total Lessons Created</div>
          <div className="stat-value text-amber-600">{stats.totalLessons || 0}</div>
        </div>
        <div className="stat bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <div className="stat-title text-gray-800 dark:text-white">Total Saved Favorites</div>
          <div className="stat-value text-amber-600">{stats.totalFavorites || 0}</div>
        </div>
        <div className="stat bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <div className="stat-title text-gray-800 dark:text-white">Recent Lessons</div>
          <div className="stat-value text-amber-600">{stats.recentLessons?.length || 0}</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Weekly Analytics</h2>
        <AnalyticsChart data={[5, 9, 3, 7, 2, 8, 4]} />
      </div>

      <div className="flex gap-4 justify-center">
        <Link to="/dashboard/add-lesson" className="btn bg-amber-600 text-white">Add New Lesson</Link>
        <Link to="/dashboard/my-lessons" className="btn btn-outline">View My Lessons</Link>
      </div>
    </div>
  );
};

export default DashboardHome;