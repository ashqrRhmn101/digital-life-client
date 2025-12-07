import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaHeart, FaBookmark, FaFlag, FaShareAlt, FaEye } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { LucideClock, LucideCalendar, Link } from "lucide-react";

import ReportModal from "./ReportModal";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import RecommendedCard from "./RecommendedCard";
import { useState } from "react";

const LessonsDetails = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
      once: true,
    });
  }, []);

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showReportModal, setShowReportModal] = useState(false);

  // Fetch Lesson
  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lessons", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
  });

  // Fetch Comments
  const { data: comments = [] } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}/comments`);
      return res.data;
    },
  });

  // Fetch Recommended
  const { data: recommended = [] } = useQuery({
    queryKey: ["recommended", lesson?.category, lesson?.emotionalTone],
    queryFn: async () => {
      if (!lesson) return [];
      const res = await axiosSecure.get("/recommended-lessons", {
        params: {
          category: lesson.category,
          tone: lesson.emotionalTone,
          excludeId: id,
        },
      });
      return res.data;
    },
    enabled: !!lesson,
  });

  // Like Mutation
  const likeMutation = useMutation({
    mutationFn: async (action) => {
      await axiosSecure.post(`/lessons/${id}/like`, {
        userId: user._id,
        action,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lesson", id]);
    },
  });

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: async (action) => {
      await axiosSecure.post(`/lessons/${id}/save`, {
        userId: user._id,
        action,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lesson", id]);
    },
  });

  // Report Handler
  const handleReport = async (reason) => {
    await axiosSecure.post(`/lessons/${id}/report`, {
      reporterId: user._id,
      reason,
    });
    Swal.fire({
      title: "Reported!",
      text: "Thank you for reporting. We'll review it soon.",
      icon: "success",
    });
    setShowReportModal(false);
  };

  // Like Toggle
  const toggleLike = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to like this lesson.",
        icon: "warning",
        showConfirmButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login
        }
      });
      return;
    }
    const isLiked = lesson.likesArray?.includes(user._id);
    likeMutation.mutate(isLiked ? "unlike" : "like");
  };

  // Save Toggle
  const toggleSave = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to save this lesson.",
        icon: "warning",
      });
      return;
    }
    const isSaved = lesson.savesArray?.includes(user._id);
    saveMutation.mutate(isSaved ? "unsave" : "save");
  };

  // Post Comment
  const postCommentMutation = useMutation({
    mutationFn: async (text) => {
      const res = await axiosSecure.post(`/lessons/${id}/comments`, {
        userId: user._id,
        text,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", id]);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  // Premium Check
  if (lesson.accessLevel === "premium" && !user?.isPremium) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md">
          <FaLock className="text-6xl text-amber-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Premium Content</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Upgrade to Premium to unlock this lesson and more.
          </p>
          <Link
            to="/pricing"
            className="btn bg-amber-600 text-white hover:bg-amber-700"
          >
            Upgrade Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 dark:from-gray-900 dark:to-black py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* 1. Lesson Information Section */}
        <div
          data-aos="fade-up"
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-8"
        >
          {lesson.featuredImage && (
            <img
              src={lesson.featuredImage}
              alt={lesson.title}
              className="w-full h-64 object-cover rounded-2xl mb-6"
            />
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            {lesson.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {lesson.fullDescription}
          </p>
          <div className="flex gap-3">
            <span className="badge badge-lg bg-amber-500 text-white">
              {lesson.category}
            </span>
            <span className="badge badge-lg bg-indigo-500 text-white">
              {lesson.emotionalTone}
            </span>
          </div>
        </div>

        {/* 2. Lesson Metadata */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 mb-8 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300"
        >
          <div className="flex items-center gap-2">
            <LucideCalendar className="w-5 h-5 text-amber-500" />
            Created: {new Date(lesson.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <LucideCalendar className="w-5 h-5 text-amber-500" />
            Updated:{" "}
            {new Date(
              lesson.updatedAt || lesson.createdAt
            ).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <LucideClock className="w-5 h-5 text-amber-500" />
            Reading Time: {Math.ceil(lesson.fullDescription / 200)} min
          </div>
          <span className="badge badge-outline">Public</span>
        </div>

        {/* 3. Author Section */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center gap-4">
            <img
              src={lesson.creatorPhoto}
              alt={lesson.creatorName}
              className="w-20 h-20 rounded-full ring-4 ring-amber-500/30"
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {lesson.creatorName}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Total Lessons: {lesson.totalLessonsByAuthor || 42}
              </p>
              <Link
                to={`/profile/${lesson.creatorEmail}`}
                className="btn btn-sm bg-amber-600 text-white mt-2"
              >
                View All by This Author
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Stats Section */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-4 text-center">
            <FaHeart className="text-3xl text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{lesson.likes || 0} Likes</p>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-4 text-center">
            <FaBookmark className="text-3xl text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{lesson.saveCount || 0} Saves</p>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-4 text-center">
            <FaEye className="text-3xl text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{lesson.views || 0} Views</p>
          </div>
        </div>

        {/* 5. Interaction Buttons */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="fixed bottom-0 left-0 right-0 md:static flex justify-center gap-4 bg-white dark:bg-gray-800 p-4 md:p-0 md:mb-8 shadow-lg md:shadow-none rounded-t-2xl md:rounded-none"
        >
          <button
            onClick={toggleSave}
            className="btn btn-circle btn-outline text-amber-600 hover:bg-amber-600 hover:text-white"
          >
            <FaBookmark className="text-xl" />
          </button>
          <button
            onClick={toggleLike}
            className="btn btn-circle btn-outline text-red-500 hover:bg-red-500 hover:text-white"
          >
            <FaHeart className="text-xl" />
          </button>
          <button
            onClick={() => setShowReportModal(true)}
            className="btn btn-circle btn-outline text-orange-500 hover:bg-orange-500 hover:text-white"
          >
            <FaFlag className="text-xl" />
          </button>
          <div className="dropdown dropdown-top md:dropdown-bottom">
            <button className="btn btn-circle btn-outline text-blue-500 hover:bg-blue-500 hover:text-white">
              <FaShareAlt className="text-xl" />
            </button>
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <FacebookShareButton url={window.location.href}>
                  Facebook
                </FacebookShareButton>
              </li>
              <li>
                <TwitterShareButton url={window.location.href}>
                  X (Twitter)
                </TwitterShareButton>
              </li>
              <li>
                <LinkedinShareButton url={window.location.href}>
                  LinkedIn
                </LinkedinShareButton>
              </li>
            </ul>
          </div>
        </div>

        {/* Report Modal */}
        {showReportModal && (
          <ReportModal
            onClose={() => setShowReportModal(false)}
            onSubmit={handleReport}
          />
        )}

        {/* 6. Comment Section */}
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold mb-6">Comments</h2>
          {user ? (
            <CommentForm
              onSubmit={(text) => postCommentMutation.mutate(text)}
            />
          ) : (
            <p className="text-center text-gray-500 mb-6">
              Login to post a comment
            </p>
          )}
          <CommentList comments={comments} />
        </div>

        {/* 7. Similar & Recommended */}
        <div data-aos="fade-up" data-aos-delay="600">
          <h2 className="text-3xl font-bold text-center mb-8">
            Similar Lessons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommended.map((rec) => (
              <RecommendedCard key={rec._id} lesson={rec} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsDetails;
