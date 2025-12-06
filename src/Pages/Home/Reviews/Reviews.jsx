import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <section className="py-20 bg-gradient-to-b from-base-100 to-base-200 dark:from-gray-900 dark:to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
          What Our Community Says
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Thousands of people are preserving their life lessons and growing together.
        </p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        breakpoints={
           {
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Autoplay, Pagination]}
        className="mt-12 pb-12"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;