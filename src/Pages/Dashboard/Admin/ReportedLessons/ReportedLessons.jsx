import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { Navigate } from "react-router";
import Swal from "sweetalert2";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { isAdmin, loading } = useAuth();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reported-lessons");
      return res.data;
    },
  });

  const handleAction = useMutation({
    mutationFn: async ({ reportId, action }) => {
      await axiosSecure.post("/admin/report-action", { reportId, action });
    },
    onSuccess: () => queryClient.invalidateQueries(["reported-lessons"]),
  });

  if (loading || isLoading) return <div>Loading...</div>;
  if (!isAdmin) return <Navigate to="/dashboard" />;

  return (
    <div className="p-8">
      <h2
        data-aos="fade-up"
        className="text-4xl font-bold text-center mb-10 text-red-600"
      >
        Reported Lessons ({reports.length})
      </h2>

      <div className="space-y-6">
        {reports.map((report, i) => (
          <div
            data-aos="fade-up"
            data-aos-delay={i * 100}
            key={report._id}
            className="bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold">{report.lessonTitle}</h3>
            <p>
              Reported by: {report.reporterName} ({report.reporterEmail})
            </p>
            <p className="mt-2">
              <strong>Reason:</strong> {report.reason}
            </p>
            <p className="text-sm text-gray-500">
              Reported on: {new Date(report.timestamp).toLocaleString()}
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() =>
                  handleAction.mutate({
                    reportId: report._id,
                    action: "delete",
                  })
                }
                className="btn btn-error btn-sm"
              >
                Delete Lesson
              </button>
              <button
                onClick={() =>
                  handleAction.mutate({
                    reportId: report._id,
                    action: "ignore",
                  })
                }
                className="btn btn-outline btn-sm"
              >
                Ignore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportedLessons;
