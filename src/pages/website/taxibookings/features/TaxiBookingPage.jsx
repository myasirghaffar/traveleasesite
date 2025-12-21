import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    StarRatingIcon,
    LocationIcon,
    HeartIcon,
    PhotoGalleryIcon,
    WifiIcon,
    AirConditioningIcon,
    UserIcon,
    CheckCircleIcon
} from '../../../../assets/icons/icons';
import { taxisData } from '../data/taxisData';

const TaxiBookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find taxi by ID or use default if not found
    const taxi = taxisData.find(t => t.id === parseInt(id)) || taxisData[0];

    const features = [
        { icon: <WifiIcon />, label: 'Free In-car WiFi' },
        { icon: <AirConditioningIcon />, label: 'Climate Control' },
        { icon: <UserIcon />, label: `Up to ${taxi.capacity} Passengers` },
        { icon: <CheckCircleIcon />, label: 'Professional Driver' },
    ];

    const rideOptions = [
        {
            name: 'Standard Ride',
            specs: 'Standard pick-up and drop-off with comfortable seating.',
            price: taxi.price
        },
        {
            name: 'Luxury Experience',
            specs: 'Premium vehicle with extra amenities and priority routing.',
            price: (parseFloat(taxi.price) * 1.5).toFixed(2)
        },
        {
            name: 'Shared Ride',
            specs: 'Economical option where you might share the ride with others.',
            price: (parseFloat(taxi.price) * 0.7).toFixed(2)
        }
    ];

    const handleNavigateToCheckout = () => {
        navigate(`/taxi-checkout/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50/30 pb-20 pt-10 font-['Inter']">
            <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors mb-6 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    <span className="text-sm font-medium">Back to listings</span>
                </button>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                    <div>
                        <h1 className="text-gray-900 text-3xl md:text-5xl font-bold leading-tight mb-3">
                            {taxi.name}
                        </h1>
                        <p className="text-gray-600 text-lg font-normal leading-7 mb-4">
                            Premium {taxi.type} service ensuring a safe and comfortable journey to your destination.
                        </p>
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-lg">
                                <StarRatingIcon className="w-4 h-4 text-yellow-500" />
                                <span className="text-gray-900 text-sm font-bold">{taxi.rating}</span>
                                <span className="text-gray-500 text-sm font-normal">({taxi.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <LocationIcon className="w-3 h-4" />
                                <span className="text-sm font-medium">{taxi.location}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition-all">
                            <HeartIcon className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Main Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 rounded-3xl overflow-hidden shadow-xl">
                    <div className="col-span-1 lg:col-span-2 relative h-[400px]">
                        <img src={taxi.image} alt={taxi.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="hidden lg:flex flex-col gap-4">
                        <div className="h-1/2 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=400" alt="Interior" className="w-full h-full object-cover" />
                        </div>
                        <div className="h-1/2 relative overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=400" alt="Dashboard" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white cursor-pointer group-hover:bg-black/60 transition-colors">
                                <PhotoGalleryIcon className="w-8 h-8 mb-2" />
                                <span className="font-bold">View Gallery</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column */}
                    <div className="flex-1">
                        {/* Features */}
                        <div className="mb-12">
                            <h2 className="text-gray-900 text-2xl font-bold mb-6">Vehicle Features</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {features.map((item, index) => (
                                    <div key={index} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center gap-3 shadow-sm">
                                        <div className="text-blue-500 scale-125">{item.icon}</div>
                                        <span className="text-gray-700 text-sm font-bold">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ride Options */}
                        <div>
                            <h2 className="text-gray-900 text-2xl font-bold mb-6">Booking Options</h2>
                            <div className="flex flex-col gap-4">
                                {rideOptions.map((option, index) => (
                                    <div key={index} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex-1">
                                            <h3 className="text-gray-900 text-xl font-bold mb-2">{option.name}</h3>
                                            <p className="text-gray-500 text-sm md:max-w-md">{option.specs}</p>
                                            <div className="mt-4 flex items-baseline gap-1">
                                                <span className="text-blue-600 text-2xl font-black">${option.price}</span>
                                                <span className="text-gray-400 text-sm font-medium">/ ride</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleNavigateToCheckout}
                                            className="w-full md:w-auto bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
                                        >
                                            Book This
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Pricing Sidebar */}
                    <div className="lg:w-[400px]">
                        <div className="sticky top-24 bg-white rounded-3xl border border-gray-200 p-8 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-slate-900 text-4xl font-black">${taxi.price}</span>
                                    <span className="text-gray-400 text-base font-medium">/ ride</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-8 text-green-600 bg-green-50 px-4 py-2 rounded-xl">
                                <CheckCircleIcon className="w-4 h-4" />
                                <span className="text-sm font-bold">Driver is nearby and available</span>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-600 font-medium">
                                    <span>Base Fare</span>
                                    <span className="text-gray-900">${taxi.price}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 font-medium">
                                    <span>Booking Fee</span>
                                    <span className="text-gray-900">$5.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600 font-medium">
                                    <span>Tax</span>
                                    <span className="text-gray-900">$3.50</span>
                                </div>
                                <hr className="border-gray-100" />
                                <div className="flex justify-between text-xl font-black">
                                    <span className="text-slate-900">Total Price</span>
                                    <span className="text-blue-600">${(parseFloat(taxi.price) + 5 + 3.5).toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleNavigateToCheckout}
                                className="w-full bg-blue-500 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95"
                            >
                                Confirm Booking
                            </button>

                            <p className="text-center text-gray-400 text-xs font-medium mt-4">
                                Free cancellation up to 15 mins before
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaxiBookingPage;
