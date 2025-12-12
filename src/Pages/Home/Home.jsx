import React from "react";
import Banner from "./Banner/Banner";
import FeaturedLessons from "./FeaturedLessons/FeaturedLessons";
import Benefits from "./Benefits/Benefits";
import TopContributors from "./TopContributors/TopContributors";
import MostSavedLessons from "./MostSavedLessons/MostSavedLessons";
import Reviews from "./Reviews/Reviews";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-black">
      {/* 1. Hero Banner */}
      <section data-aos="fade-in">
        <Banner />
      </section>

      {/* 2. Featured Lessons (Dynamic) */}
      <section data-aos="fade-up" data-aos-delay="200" className="py-20 px-4">
        <FeaturedLessons />
      </section>

      {/* 3. Why Learning From Life Matters (Static 4 Cards) */}
      <section
        data-aos="fade-up"
        data-aos-delay="300"
        className="py-20 bg-white dark:bg-gray-800"
      >
        <Benefits />
      </section>

      {/* 4. Top Contributors of the Week (Dynamic) */}
      <section data-aos="fade-up" data-aos-delay="400" className="py-20 px-4">
        <TopContributors />
      </section>

      {/* 5. Most Saved Lessons (Dynamic) */}
      <section
        data-aos="fade-up"
        data-aos-delay="500"
        className="py-20 bg-gray-50 dark:bg-gray-900"
      >
        <MostSavedLessons />
      </section>

      {/* 6. Reviews / Testimonials */}
      <section data-aos="fade-up" data-aos-delay="600" className="py-20 px-4">
        <Reviews reviewsPromise={reviewsPromise} />
      </section>
    </div>
  );
};

export default Home;
