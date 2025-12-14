import React from "react";
import { FaBrain, FaHeart, FaLightbulb, FaUsers } from "react-icons/fa";

const benefits = [
  {
    icon: <FaBrain className="text-6xl text-amber-600" />,
    title: "Personal Growth",
    desc: "Turn experiences into wisdom that lasts a lifetime",
  },
  {
    icon: <FaHeart className="text-6xl text-amber-600" />,
    title: "Emotional Healing",
    desc: "Reflect, release, and rise stronger than before",
  },
  {
    icon: <FaLightbulb className="text-6xl text-amber-600" />,
    title: "Better Decisions",
    desc: "Learn from mistakes to make wiser choices ahead",
  },
  {
    icon: <FaUsers className="text-6xl text-amber-600" />,
    title: "Help Others",
    desc: "Your story can light the path for someone else",
  },
];

const Benefits = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-5xl font-bold text-center mb-12">
        Why Share Your Life Lessons?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, i) => (
          <div
            data-aos="zoom-in"
            data-aos-delay={i * 150}
            key={i}
            className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-800 rounded-3xl p-8 text-center shadow-xl border border-amber-200 dark:border-amber-700 hover:shadow-2xl transition"
          >
            <div className="mb-6">{benefit.icon}</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {benefit.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{benefit.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
