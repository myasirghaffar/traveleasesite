import React from 'react';
import HeroSection from './features/HeroSection';
import SearchSection from './features/SearchSection';
import TopDestinationCarousel from './features/TopDestinationCarousel';
import ProcessSteps from './features/ProcessSteps';
import BookingSolution from './features/BookingSolution';
import PopularHotels from '../../../components/PopularHotels';
import BestBookingPlatform from './features/BestBookingPlatfom';
import Testimonials from './features/Testimonials';
import FaqSection from './features/FaqSection';
import { useGetHotelsQuery } from '../../../services/Api';

const Homepage = () => {
    const { data, isLoading, error } = useGetHotelsQuery({ limit: 6, status: 'active' });
    
    // Transform API data to match component format
    const hotelsData = data?.data?.hotels?.map(hotel => ({
        id: hotel.id,
        name: hotel.name,
        location: hotel.city || hotel.location || 'Unknown',
        rating: hotel.rating?.toString() || '4.5',
        reviews: hotel.reviews_count?.toString() || '0',
        price: hotel.min_price?.toString() || hotel.price_per_night?.toString() || '100',
        image: hotel.cover_image || hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
        tags: hotel.is_featured ? ['sale'] : []
    })) || [];

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

            {!isLoading && !error && <PopularHotels data={hotelsData} />}

            <BestBookingPlatform />

            <Testimonials />

            <FaqSection />
        </div>
    );
};

export default Homepage;
