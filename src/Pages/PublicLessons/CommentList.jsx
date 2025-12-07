import React from "react";

const CommentList = ({ comments }) => {
  return (
    <div className="space-y-6">
      {comments.length === 0 ? (
        <p className="text-center text-gray-500">
          No comments yet. Be the first!
        </p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="bg-base-200 p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={comment.userPhoto || "/default-user.jpg"}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <p className="font-semibold">{comment.userName || "Anonymous"}</p>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
