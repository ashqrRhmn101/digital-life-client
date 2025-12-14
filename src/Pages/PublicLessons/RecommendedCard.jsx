import React from "react";
import { Link } from "react-router";
import { FaHeart, FaBookmark, FaEye, FaLock } from "react-icons/fa";

const RecommendedCard = ({ lesson }) => {
  // console.log(lesson)
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <img
          src={lesson.creatorPhoto}
          alt={lesson.creatorName}
          className="w-12 h-12 rounded-full ring-2 ring-amber-500/30"
        />
        <div>
          <p className="font-semibold">{lesson.creatorName}</p>
          <p className="text-sm text-gray-500">
            {new Date(lesson.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600 transition">
        {lesson.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {lesson.shortDescription || lesson.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="badge badge-outline">{lesson.category}</span>
        <span className="badge badge-outline badge-info">
          {lesson.emotionalTone}
        </span>
        {lesson.accessLevel === "premium" && (
          <span className="badge badge-warning">Premium</span>
        )}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <FaHeart className="text-red-500" /> {lesson.likes || 0}
          </span>
          <span className="flex items-center gap-1">
            <FaBookmark /> {lesson.saveCount || 0}
          </span>
          <span className="flex items-center gap-1">
            <FaEye /> {lesson.views || 0}
          </span>
        </div>
        <Link
          to={`/lessons/${lesson._id}`}
          className="text-amber-600 font-medium hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default RecommendedCard;
