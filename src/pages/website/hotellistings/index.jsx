import React, { useState } from 'react';
import HeroSection from './features/HeroSection';
import PopularHotels, { hotelsData } from '../../../components/PopularHotels';
import ReusableFilter from '../../../components/ReusableFilter';

const HotelListingsPage = () => {
    const [filteredHotels, setFilteredHotels] = useState(hotelsData);

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
            hotel.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredHotels(filtered);
    };

    const handleFilter = (key, value) => {
        // Implementation for filtering logic would go here
        // For now just showing the UI updates
        console.log(`Filtering by ${key}: ${value}`);
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
                <PopularHotels displayTitle={false} data={filteredHotels} />
            </div>
        </div>
    );
};

export default HotelListingsPage;
