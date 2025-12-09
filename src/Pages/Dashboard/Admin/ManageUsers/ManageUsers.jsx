import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["manageUsers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?.email=${user.email}`);
      return res.data;
    },
  });

  const handleuserDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount) {
            // refresh the data in the ui
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your user request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-amber-600 font-bold p-2 text-3xl">
        All Users : {users.length}
      </h1>

      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 stat bg-white dark:bg-gray-800" data-aos="fade-up">
          <table className="table text-white">
            {/* head */}
            <thead className="text-white">
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Premium</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id}>
                  <th>{i + 1}</th>
                  <td>{user.name || "unknown"}</td>
                  <td>{user.email}</td>
                  <td>{user.isPremium ? <span className="text-yellow-500 font-semibold">Premium User </span>: "Free User"}</td>
                  {user.role === "admin" ? (
                    <td className="text-amber-600">{user.role}</td>
                  ) : (
                    <td>{user.role}</td>
                  )}
                  <td className="flex gap-5">
                    <button className="btn btn-square dark:hover:bg-amber-900 hover:text-white">
                      <FaMagnifyingGlass />
                    </button>
                    <button className="btn btn-square dark:hover:bg-amber-900 hover:text-white">
                      <FiEdit />
                    </button>
                    {/* user admin */}
                    {user.role === "admin" ? (
                      <button className="btn btn-square bg-gray-400 cursor-move" disabled>
                        <FaTrash />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleuserDelete(user._id)}
                        className="btn btn-square dark:hover:bg-amber-900 hover:text-white"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
