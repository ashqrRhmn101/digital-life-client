import React, { useState } from "react";
import Swal from "sweetalert2";

const ReportModal = ({ onClose, onSubmit }) => {
  const [reason, setReason] = useState("");

  const reasons = [
    "Inappropriate Content",
    "Hate Speech or Harassment",
    "Misleading or False Information",
    "Spam or Promotional Content",
    "Sensitive or Disturbing Content",
    "Other",
  ];

  const handleSubmit = () => {
    if (!reason) {
      Swal.fire("Error", "Please select a reason", "error");
      return;
    }
    Swal.fire({
      title: "Confirm Report?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Report",
    }).then((result) => {
      if (result.isConfirmed) {
        onSubmit(reason);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4">Report This Lesson</h3>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="select select-bordered w-full mb-4"
        >
          <option value="">Select Reason</option>
          {reasons.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        <div className="flex gap-4">
          <button onClick={onClose} className="btn btn-outline flex-1">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn bg-red-600 text-white flex-1"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
