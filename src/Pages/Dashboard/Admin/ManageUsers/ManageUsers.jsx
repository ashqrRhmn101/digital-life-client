import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { isAdmin, loading } = useAuth();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, role }) => {
      await axiosSecure.patch(`/admin/users/${id}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-users"]);
      Swal.fire("Updated!", "User role changed", "success");
    },
  });

  if (loading || isLoading) return <div>Loading...</div>;
  if (!isAdmin) return <Navigate to="/dashboard" />;

  return (
    <div className="p-8">
      <h2
        data-aos="fade-up"
        className="text-4xl font-bold text-center mb-10 text-amber-600"
      >
        Manage Users ({users.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-amber-100 dark:bg-amber-900">
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Premium</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr data-aos="fade-up" data-aos-delay={i * 50} key={u._id}>
                <td>
                  <img src={u.photoURL} className="w-12 h-12 rounded-full" />
                </td>
                <td>{u.name || "Anonymous"}</td>
                <td>{u.email}</td>
                <td>
                  <select
                    defaultValue={u.role}
                    onChange={(e) =>
                      mutation.mutate({ id: u._id, role: e.target.value })
                    }
                    className="select select-sm select-bordered"
                  >
                    <option>user</option>
                    <option>admin</option>
                  </select>
                </td>
                <td>{u.isPremium ? "Yes" : "No"}</td>
                <td>
                  <button className="btn btn-xs btn-error">Delete</button>
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
