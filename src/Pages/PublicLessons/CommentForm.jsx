import React, { useState } from "react";
import Swal from "sweetalert2";

const CommentForm = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      Swal.fire("Error", "Comment cannot be empty", "error");
      return;
    }
    onSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your thoughts..."
        className="textarea textarea-bordered w-full h-32 mb-4"
      />
      <button type="submit" className="btn bg-amber-600 text-white">
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
