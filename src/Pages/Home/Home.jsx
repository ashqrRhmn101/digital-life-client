import React from 'react';
import Banner from './Banner/Banner';
import Reviews from './Reviews/Reviews';

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
    return (
        <div>
            <Banner/>
            <Reviews reviewsPromise={reviewsPromise}/>
        </div>
    );
};

export default Home;