import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { Navigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "../../../../Components/Loading";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { isAdmin, loading: authLoading } = useAuth();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reported-lessons");
      return res.data;
    },
  });

  // console.log(reports)

  const actionMutation = useMutation({
    mutationFn: async ({ reportId, action }) => {
      await axiosSecure.post("/admin/report-action", { reportId, action });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reported-lessons"]);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Action completed",
        timer: 1500,
      });
    },
    onError: (err) => {
      Swal.fire("Error!", err.response?.data?.message || "Failed", "error");
    },
  });

  const handleAction = (reportId, action, lessonTitle) => {
    const messages = {
      delete: `Delete "${lessonTitle}" permanently?`,
      ignore: `Ignore this report for "${lessonTitle}"?`,
    };

    Swal.fire({
      title: "Are you sure?",
      text: messages[action],
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: action === "delete" ? "#d33" : "#3085d6",
      confirmButtonText:
        action === "delete" ? "Yes, delete it!" : "Yes, ignore",
    }).then((result) => {
      if (result.isConfirmed) {
        actionMutation.mutate({ reportId, action });
      }
    });
  };

  if (authLoading || isLoading) return <Loading />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  if (reports.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-4xl font-bold text-gray-400">
          No reported lessons yet
        </h2>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-base-100">
      <h2
        data-aos="fade-up"
        className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent"
      >
        Reported Lessons ({reports.length})
      </h2>

      <div className="grid gap-6 max-w-5xl mx-auto">
        {reports.map((report, i) => (
          <div
            data-aos="fade-up"
            data-aos-delay={i * 100}
            key={report._id}
            className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/20 border border-red-300 dark:border-red-700 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-red-700 dark:text-red-400">
                  {report.lessonTitle}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Reported by:{" "}
                  <span className="font-medium">{report.reporterName}</span> (
                  {report.reporterEmail})
                </p>
                <p className="mt-2">
                  <strong>Reason:</strong> {report.reason}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(report.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() =>
                  handleAction(report._id, "delete", report.lessonTitle)
                }
                disabled={actionMutation.isLoading}
                className="btn btn-error hover:btn-error/90"
              >
                {actionMutation.isLoading ? "Processing..." : "Delete Lesson"}
              </button>
              <button
                onClick={() =>
                  handleAction(report._id, "ignore", report.lessonTitle)
                }
                disabled={actionMutation.isLoading}
                className="btn btn-outline hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Ignore Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportedLessons;
