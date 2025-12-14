import React, { useState } from "react";
import Swal from "sweetalert2";

const CommentForm = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      Swal.fire("Error", "Comment cannot be empty", "error");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(text);
      Swal.fire("Success", "Comment posted successfully!", "success");
      setText("");
    } catch (error) {
      Swal.fire("Error", "Failed to post comment", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your thoughts..."
        className="textarea textarea-bordered w-full h-32 mb-4"
        disabled={loading}
      />
      <button
        type="submit"
        className="btn bg-amber-600 text-white"
        disabled={loading}
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
