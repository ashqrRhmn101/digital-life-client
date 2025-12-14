import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import { Navigate } from "react-router-dom";

const AdminProfile = () => {
  const { user, currentUser } = useAuth();

  if (!currentUser?.role === "admin") return <Navigate to="/dashboard" />;

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div data-aos="zoom-in" className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 max-w-2xl text-center border-4 border-amber-500">
        <img src={user.photoURL} className="w-32 h-32 rounded-full mx-auto ring-8 ring-amber-500 mb-6" />
        <h1 className="text-5xl font-bold text-amber-600 mb-2">{user.displayName}</h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300 mb-4">{user.email}</p>
        <div className="badge badge-lg badge-warning text-xl py-4 px-8">
          ADMIN PANEL ACCESS
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg">
          You have full control over the platform.
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;