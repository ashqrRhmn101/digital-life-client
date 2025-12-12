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
    mutationFn: async (id) => await axiosSecure.delete(`/lessons/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-lessons-admin"]);
      Swal.fire("Deleted!", "Lesson removed", "success");
    },
  });

  if (loading || isLoading) return <Loading/>;
  if (!isAdmin) return <Navigate to="/dashboard" />;

  return (
    <div className="p-8">
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
              <tr data-aos="fade-up" data-aos-delay={i * 50} key={lesson._id}>
                <td className="max-w-xs truncate">{lesson.title}</td>
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
