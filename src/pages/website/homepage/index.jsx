import React from 'react';
import HeroSection from './features/HeroSection';
import SearchSection from './features/SearchSection';
import TopDestinationCarousel from './features/TopDestinationCarousel';
import ProcessSteps from './features/ProcessSteps';
import BookingSolution from './features/BookingSolution';
import PopularHotels, { hotelsData } from '../../../components/PopularHotels';
import BestBookingPlatform from './features/BestBookingPlatfom';
import Testimonials from './features/Testimonials';
import FaqSection from './features/FaqSection';

const Homepage = () => {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section Container */}
            <div className="w-full max-w-8xl px-4 pt-2">
                <HeroSection />
            </div>

            {/* Search Section Container - Overlapping Hero Section */}
            <div className="w-full px-4 -mt-32 md:-mt-40 relative z-20">
                <SearchSection />
            </div>

            {/* Other Content Spacing */}
            <div className="pt-24 w-full max-w-[1240px] mx-auto space-y-24">
                <ProcessSteps />
                <TopDestinationCarousel />
            </div>

            <BookingSolution />

            <PopularHotels data={hotelsData.slice(0, 6)} />

            <BestBookingPlatform />

            <Testimonials />

            <FaqSection />
        </div>
    );
};

export default Homepage;
