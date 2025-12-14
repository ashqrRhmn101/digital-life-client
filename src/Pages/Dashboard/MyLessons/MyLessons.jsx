import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["my-lessons", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons", {
        params: { email: user.email },
      });
      return res.data.lessons;
    },
  });

  // user email find
  const { data: profile = {} } = useQuery({
    queryKey: ["profile", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/user", {
        params: { email: user.email },
      });
      return res.data;
    },
  });
  // console.log(profile);
  const isPremium = profile?.isPremium || false;

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/lessons/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Lesson removed successfully", "success");
      queryClient.invalidateQueries(["my-lessons"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      await axiosSecure.patch(`/lessons/${id}`, data);
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Lesson updated successfully", "success");
      setEditModalOpen(false);
      queryClient.invalidateQueries(["my-lessons"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleEdit = (lesson) => {
    setEditingLesson(lesson);
    setEditModalOpen(true);
  };

  const { register, handleSubmit } = useForm({
    defaultValues: editingLesson,
  });

  const onUpdate = (data) => {
    updateMutation.mutate({ id: editingLesson._id, data });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 rounded-3xl shadow-2xl border border-amber-200 dark:border-amber-800">
      <h2
        data-aos="fade-up"
        className="text-4xl font-bold text-center bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent mb-8"
      >
        My Lessons
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Tone</th>
              <th>Created</th>
              <th>Likes</th>
              <th>Saves</th>
              <th>Visibility</th>
              <th>Access</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <tr
                data-aos="fade-up"
                data-aos-delay={index * 100}
                key={lesson._id}
              >
                <td>{lesson.title}</td>
                <td>{lesson.category}</td>
                <td>{lesson.emotionalTone}</td>
                <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>
                <td>{lesson.likes}</td>
                <td>{lesson.saveCount}</td>
                <td>
                  <select
                    defaultValue={lesson.visibility}
                    onChange={(e) =>
                      updateMutation.mutate({
                        id: lesson._id,
                        data: { visibility: e.target.value },
                      })
                    }
                    className="select select-xs select-bordered"
                  >
                    <option>Public</option>
                    <option>Private</option>
                  </select>
                </td>
                <td>
                  <Tippy content={!isPremium ? "Upgrade to change" : ""}>
                    <select
                      defaultValue={lesson.accessLevel}
                      disabled={!isPremium}
                      onChange={(e) =>
                        updateMutation.mutate({
                          id: lesson._id,
                          data: { accessLevel: e.target.value },
                        })
                      }
                      className="select select-xs select-bordered"
                    >
                      <option>Free</option>
                      <option>Premium</option>
                    </select>
                  </Tippy>
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleEdit(lesson)}
                    className="btn btn-sm btn-info"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className="btn btn-sm btn-error"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            data-aos="zoom-in"
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-lg w-full"
          >
            <h3 className="text-2xl font-bold mb-4">Edit Lesson</h3>
            <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
              <input
                type="text"
                {...register("title")}
                placeholder="Title"
                className="input input-bordered w-full"
              />
              <textarea
                {...register("description")}
                placeholder="Description"
                className="textarea textarea-bordered w-full h-32"
              />
              <button
                type="submit"
                className="btn bg-amber-600 text-white w-full"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="btn btn-outline w-full"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLessons;
