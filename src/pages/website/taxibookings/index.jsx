import React, { useState } from 'react';
import HeroSection from './features/HeroSection';
import TaxiFilter from './features/TaxiFilter';
import TaxiCard from './features/TaxiCard';
import { taxisData } from './data/taxisData';

const TaxiBookingsPage = () => {
    const [filteredTaxis, setFilteredTaxis] = useState(taxisData);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        vehicleType: 'all',
        priceRange: 'all',
        capacity: 'all'
    });

    const applyFilters = (term, currentFilters) => {
        let result = taxisData.filter(taxi =>
            taxi.name.toLowerCase().includes(term.toLowerCase()) ||
            taxi.location.toLowerCase().includes(term.toLowerCase()) ||
            taxi.type.toLowerCase().includes(term.toLowerCase())
        );

        if (currentFilters.vehicleType !== 'all') {
            result = result.filter(taxi => taxi.type === currentFilters.vehicleType);
        }

        if (currentFilters.capacity !== 'all') {
            const cap = parseInt(currentFilters.capacity);
            result = result.filter(taxi => taxi.capacity >= cap);
        }

        if (currentFilters.priceRange !== 'all') {
            if (currentFilters.priceRange === 'budget') {
                result = result.filter(taxi => parseFloat(taxi.price) < 40);
            } else if (currentFilters.priceRange === 'mid') {
                result = result.filter(taxi => parseFloat(taxi.price) >= 40 && parseFloat(taxi.price) <= 60);
            } else if (currentFilters.priceRange === 'premium') {
                result = result.filter(taxi => parseFloat(taxi.price) > 60);
            }
        }

        setFilteredTaxis(result);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        applyFilters(term, filters);
    };

    const handleFilter = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        applyFilters(searchTerm, newFilters);
    };

    return (
        <div className="flex flex-col items-center pb-20 bg-gray-50/30">
            {/* Hero Section */}
            <div className="w-full max-w-8xl px-4 pt-2">
                <HeroSection />
            </div>

            {/* Filter Section - Overlapping spacing */}
            <div className="w-full max-w-[1240px] px-4 -mt-12 relative z-30">
                <TaxiFilter
                    onSearchChange={handleSearch}
                    onFilterChange={handleFilter}
                />
            </div>

            {/* Listings Header based on User Request */}
            <div className="max-w-[1240px] w-full px-4 md:px-8 mt-24 text-center">
                <h2 className="text-stone-950 text-4xl md:text-5xl font-bold font-['Poppins'] leading-tight mb-4 tracking-tight">
                    Available Taxis Near You
                </h2>
                <p className="text-neutral-600 text-lg md:text-xl font-normal font-['Roboto'] leading-relaxed max-w-[700px] mx-auto">
                    Choose from our available drivers in your area. Professional drivers and well-maintained vehicles for a safe trip.
                </p>
            </div>

            {/* Taxi Cards Grid */}
            <div className="max-w-[1240px] w-full mt-16 px-4">
                {filteredTaxis.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTaxis.map(taxi => (
                            <TaxiCard key={taxi.id} taxi={taxi} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-400 mb-2">No Taxis Found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setFilters({ vehicleType: 'all', priceRange: 'all', capacity: 'all' });
                                setFilteredTaxis(taxisData);
                            }}
                            className="mt-6 text-blue-600 font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaxiBookingsPage;
