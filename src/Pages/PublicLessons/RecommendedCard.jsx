import React from "react";
import { Link } from "react-router-dom";

const RecommendedCard = ({ lesson }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:shadow-xl transition">
      <h4 className="text-lg font-bold mb-2">{lesson.title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{lesson.shortDescription}</p>
      <div className="flex gap-2 mb-4">
        <span className="badge badge-sm">{lesson.category}</span>
        <span className="badge badge-sm badge-info">{lesson.emotionalTone}</span>
      </div>
      <Link to={`/lessons/${lesson._id}`} className="text-amber-600 hover:underline">
        Read More →
      </Link>
    </div>
  );
};

export default RecommendedCard;