import React, { useState, useEffect, useMemo } from 'react';
import HeroSection from './features/HeroSection';
import PopularHotels from '../../../components/PopularHotels';
import ReusableFilter from '../../../components/ReusableFilter';
import { useGetHotelsQuery } from '../../../services/Api';
import { getImageUrl } from '../../../services/ApiEndpoints';

const HotelListingsPage = () => {
    const { data, isLoading, error } = useGetHotelsQuery({ status: 'active' });
    const [filteredHotels, setFilteredHotels] = useState([]);
    
    // Transform API data to match component format
    const hotelsData = useMemo(() => {
        if (!data?.data?.hotels) return [];
        return data.data.hotels.map(hotel => ({
            id: hotel.id,
            name: hotel.name,
            location: hotel.city || hotel.location || 'Unknown',
            rating: hotel.rating?.toString() || '4.5',
            reviews: hotel.reviews_count?.toString() || '0',
            price: hotel.min_price?.toString() || hotel.price_per_night?.toString() || '100',
            image: getImageUrl(hotel.cover_image_url) || getImageUrl(hotel.gallery_images?.[0]) || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
            tags: hotel.is_featured ? ['sale'] : []
        }));
    }, [data]);

    useEffect(() => {
        if (hotelsData.length > 0) {
            setFilteredHotels(hotelsData);
        }
    }, [hotelsData]);

    // Filter configurations
    const filterOptions = [
        {
            key: 'location',
            label: 'Location',
            options: [
                { value: 'all', label: 'All Locations' },
                { value: 'New Zealand', label: 'New Zealand' },
                { value: 'Australia', label: 'Australia' },
                { value: 'USA', label: 'United States' },
            ]
        },
        {
            key: 'priceRange',
            label: 'Price Range',
            options: [
                { value: 'budget', label: 'Under $150' },
                { value: 'mid', label: '$150 - $250' },
                { value: 'luxury', label: 'Over $250' },
            ]
        }
    ];

    const handleSearch = (term) => {
        const filtered = hotelsData.filter(hotel =>
            hotel.name.toLowerCase().includes(term.toLowerCase()) ||
            hotel.location.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredHotels(filtered);
    };

    const handleFilter = (key, value) => {
        let filtered = [...hotelsData];
        
        if (key === 'location' && value !== 'all') {
            filtered = filtered.filter(hotel => 
                hotel.location.toLowerCase().includes(value.toLowerCase())
            );
        }
        
        if (key === 'priceRange' && value !== 'all') {
            if (value === 'budget') {
                filtered = filtered.filter(hotel => parseFloat(hotel.price) < 150);
            } else if (value === 'mid') {
                filtered = filtered.filter(hotel => 
                    parseFloat(hotel.price) >= 150 && parseFloat(hotel.price) <= 250
                );
            } else if (value === 'luxury') {
                filtered = filtered.filter(hotel => parseFloat(hotel.price) > 250);
            }
        }
        
        setFilteredHotels(filtered);
    };

    return (
        <div className="flex flex-col items-center pb-20">
            {/* Hero Section */}
            <div className="w-full max-w-8xl px-4 pt-2">
                <HeroSection />
            </div>



            {/* Listings Header */}
            <div className="max-w-[1240px] w-full px-4 md:px-8 mt-24 text-center">
                <h2 className="text-stone-950 text-4xl md:text-5xl font-bold font-['Poppins'] leading-tight mb-4 tracking-tight">
                    Available Hotels
                </h2>
                <p className="text-neutral-600 text-lg md:text-xl font-normal font-['Roboto'] leading-relaxed max-w-[700px] mx-auto">
                    A curated list of luxury stays and comfortable budget hotels for your next trip.
                </p>
            </div>

            {/* Filter Section - Overlapping spacing */}
            <div className="w-full max-w-[1240px] px-4 mt-5 relative z-30">
                <ReusableFilter
                    searchPlaceholder="Search by Hotel Name..."
                    filters={filterOptions}
                    onSearchChange={handleSearch}
                    onFilterChange={handleFilter}
                    className="full-width-filters"
                />
            </div>

            {/* Hotel Cards Grid - Reusing PopularHotels structure but with filtered data */}
            <div className="max-w-[1240px] w-full mt-12 px-4">
                {isLoading ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500">Loading hotels...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-500">Error loading hotels. Please try again.</p>
                    </div>
                ) : filteredHotels.length > 0 ? (
                    <PopularHotels displayTitle={false} data={filteredHotels} />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500">No hotels found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelListingsPage;
