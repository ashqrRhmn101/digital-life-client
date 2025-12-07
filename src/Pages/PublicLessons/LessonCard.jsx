import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaBookmark, FaEye, FaLock } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const LessonCard = ({ lesson }) => {
  const { user } = useAuth();
  const isPremiumUser = user?.isPremium || false;

  const isPremiumLesson = lesson.accessLevel === "premium";

  return (
    <div className="group relative rounded-2xl shadow-lg border-[1px] border-black/70 overflow-hidden hover:shadow-2xl transition-all duration-500">
      {isPremiumLesson && !isPremiumUser && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center text-white text-center">
            <FaLock className="text-5xl mx-auto mb-3" />
            <p className="font-bold text-xl">Premium Lesson</p>
            <Link to="/pricing" className="btn bg-amber-600 text-white mt-4">
              Upgrade Now
            </Link>
          </div>
        </div>
      )}

      <div
        className={`p-6 ${isPremiumLesson && !isPremiumUser ? "blur-sm" : ""}`}
      >
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
          {lesson.shortDescription}
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
            to={`/lesson/${lesson._id}`}
            className="text-amber-600 font-medium hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
