import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../../../Components/Loading";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { isAdmin, loading: authLoading } = useAuth();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  // Role Change Mutation
  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      await axiosSecure.patch(`/admin/users/${id}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-users"]);
      Swal.fire("Updated!", "User role changed", "success");
    },
  });

  // Delete User Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/admin/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-users"]);
      Swal.fire("Deleted!", "User has been removed", "success");
    },
    onError: (err) => {
      Swal.fire(
        "Error!",
        err.response?.data?.message || "Failed to delete",
        "error"
      );
    },
  });

  const handleUserDelete = (id, name) => {
    Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to delete "${
        name || "this user"
      }"? This cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (authLoading || isLoading) return <Loading />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return (
    <div className="p-8 min-h-screen bg-base-100 text-white">
      <h2
        data-aos="fade-up"
        className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"
      >
        Manage Users ({users.length})
      </h2>

      <div className="overflow-x-auto shadow-2xl rounded-xl">
        <table className="table w-full bg-white dark:bg-gray-800">
          <thead className="bg-amber-100 dark:bg-amber-900">
            <tr>
              <th className="text-left">Photo</th>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-left">Premium</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                data-aos="fade-up"
                data-aos-delay={i * 50}
                key={u._id}
                className="border-b hover:bg-amber-50 dark:hover:bg-gray-700 transition"
              >
                <td>
                  <img
                    src={
                      u.photoURL ||
                      "https://i.ibb.co/0s3Z9kL/profile-avatar.jpg"
                    }
                    alt="user"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500"
                  />
                </td>
                <td className="font-medium">{u.name || "Anonymous"}</td>
                <td>{u.email}</td>
                <td>
                  <select
                    defaultValue={u.role}
                    onChange={(e) =>
                      roleMutation.mutate({ id: u._id, role: e.target.value })
                    }
                    className="select select-sm select-bordered w-28 bg-amber-700"
                    disabled={deleteMutation.isLoading}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  {u.isPremium ? (
                    <span className="badge badge-warning badge-lg">
                      Premium
                    </span>
                  ) : (
                    <span className="text-gray-500">Free</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleUserDelete(u._id, u.name)}
                    className="btn btn-xs btn-error hover:btn-error/90"
                    disabled={deleteMutation.isLoading}
                  >
                    {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
