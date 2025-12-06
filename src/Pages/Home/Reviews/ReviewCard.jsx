import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { name, photo, rating, review: text, date } = review;

  return (
    <div className="mx-4 my-8">
      <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-amber-200/30 dark:border-amber-800/30 hover:scale-105 transition-transform duration-500">
        {/* Quote Icon */}
        <FaQuoteLeft className="absolute top-6 left-6 text-5xl text-amber-500/20" />

        {/* Rating Stars */}
        <div className="flex justify-center gap-1 mt-4 mb-6">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`w-5 h-5 ${
                i < rating ? "text-amber-500" : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed italic px-6">
          "{text}"
        </p>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

        {/* User Info */}
        <div className="flex items-center gap-4">
          <img
            src={photo}
            alt={name}
            className="w-16 h-16 rounded-full ring-4 ring-amber-500/30 object-cover"
          />
          <div className="text-left">
            <h3 className="font-bold text-xl text-gray-800 dark:text-white">
              {name}
            </h3>
            <p className="text-sm text-amber-600 dark:text-amber-400">
              Member since {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;