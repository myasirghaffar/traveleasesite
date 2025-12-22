import React from 'react';

const HeroBanner = () => {
    return (
        <div className="relative w-full h-72 rounded-3xl overflow-hidden mb-8">
            <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=300&fit=crop"
                alt="Admin Dashboard Banner"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex flex-col items-center justify-center">
                <h1 className="text-white text-5xl font-semibold font-['Outfit'] leading-[62px] mb-4">
                    Admin Dashboard
                </h1>
                <p className="text-white text-xl font-semibold font-['Outfit'] leading-10">
                    Manage hotels, bookings, users, and taxi services — all in one place.
                </p>
            </div>
        </div>
    );
};

export default HeroBanner;
