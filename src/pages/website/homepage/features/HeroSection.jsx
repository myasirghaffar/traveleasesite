import React from 'react';

const HeroSection = () => {
    return (
        <section className="text-center py-20">
            <h1 className="text-5xl font-bold mb-6 text-gray-900">
                Explore the World with Travel Ease
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Discover new places, meet new people, and create memories that last a lifetime.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Your Journey
            </button>
        </section>
    );
};

export default HeroSection;
