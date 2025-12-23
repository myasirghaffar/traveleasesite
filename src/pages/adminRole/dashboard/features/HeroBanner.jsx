import React from 'react';

const HeroBanner = () => {
    return (
        <div className="relative w-full h-48 md:h-72 rounded-3xl overflow-hidden mb-8">
            <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=300&fit=crop"
                alt="Admin Dashboard Banner"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex flex-col items-center md:items-start justify-center px-6 md:px-12 text-center md:text-left">
                <h1 className="text-white text-3xl md:text-5xl font-semibold font-['Outfit'] leading-tight md:leading-[62px] mb-2 md:mb-4">
                    Admin Dashboard
                </h1>
                <p className="text-white text-sm md:text-xl font-medium md:font-semibold font-['Outfit'] leading-relaxed md:leading-10 max-w-lg md:max-w-none">
                    Manage hotels, bookings, users, and taxi services — all in one place.
                </p>
            </div>
        </div>
    );
};

export default HeroBanner;
