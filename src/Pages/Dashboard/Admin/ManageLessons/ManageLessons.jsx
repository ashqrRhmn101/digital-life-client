import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../../../Components/Loading";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { isAdmin, loading } = useAuth();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["all-lessons-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/lessons");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/lessons/${id}`);
        return res.data;
      } else {
        throw new Error("Deletion cancelled");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-lessons-admin"]);
      Swal.fire("Deleted!", "Lesson removed successfully", "success");
    },
    onError: () => {
      Swal.fire("Cancelled", "Lesson was not deleted", "info");
    },
  });

  if (loading || isLoading) return <Loading />;
  if (!isAdmin) return <Navigate to="/dashboard" />;

  return (
    <div className="p-8 rounded-3xl shadow-2xl border border-amber-200 dark:border-amber-800">
      <h2
        data-aos="fade-up"
        className="text-4xl font-bold text-center mb-10 text-amber-600"
      >
        Manage All Lessons ({lessons.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-amber-500">
              <th>Title</th>
              <th>Creator</th>
              <th>Category</th>
              <th>Access</th>
              <th>Likes</th>
              <th>Reports</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, i) => (
              <tr
                data-aos="fade-up"
                data-aos-delay={i * 50}
                key={lesson._id}
                className="hover:bg-amber-50"
              >
                <td className="max-w-[200px] truncate">{lesson.title}</td>
                <td>{lesson.creatorName}</td>
                <td>{lesson.category}</td>
                <td>{lesson.accessLevel}</td>
                <td>{lesson.likes}</td>
                <td>{lesson.reportCount || 0}</td>
                <td>
                  <button
                    onClick={() => deleteMutation.mutate(lesson._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
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

export default ManageLessons;
