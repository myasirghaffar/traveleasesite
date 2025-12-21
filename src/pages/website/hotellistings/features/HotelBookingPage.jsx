import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    StarRatingIcon,
    LocationIcon,
    HeartIcon,
    PhotoGalleryIcon,
    WifiIcon,
    ParkingIcon,
    AirConditioningIcon,
    BreakfastIcon,
    PoolIcon,
    GymIcon,
    AirportShuttleIcon,
    BedIcon,
    GuestsIcon,
    SizeIcon,
    CheckCircleIcon
} from '../../../../assets/icons/icons';
import { hotelsData } from '../../../../components/PopularHotels';

const HotelBookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find hotel by ID or use default if not found
    const hotel = hotelsData.find(h => h.id === parseInt(id)) || hotelsData[0];

    const amenities = [
        { icon: <WifiIcon />, label: 'Free WiFi' },
        { icon: <ParkingIcon />, label: 'Parking' },
        { icon: <AirConditioningIcon />, label: 'Air Conditioning' },
        { icon: <BreakfastIcon />, label: 'Breakfast Included' },
        { icon: <PoolIcon />, label: 'Pool' },
        { icon: <GymIcon />, label: 'Gym' },
        { icon: <AirportShuttleIcon />, label: 'Airport Shuttle' },
    ];

    const rooms = [
        {
            name: 'Deluxe King Room',
            specs: [
                { icon: <BedIcon />, label: 'King Bed' },
                { icon: <GuestsIcon />, label: '2 Guests' },
                { icon: <SizeIcon />, label: '35 m²' }
            ],
            price: 120
        },
        {
            name: 'Executive Suite',
            specs: [
                { icon: <BedIcon />, label: 'King Bed + Sofa' },
                { icon: <GuestsIcon />, label: '4 Guests' },
                { icon: <SizeIcon />, label: '55 m²' }
            ],
            price: 280
        },
        {
            name: 'Presidential Suite',
            specs: [
                { icon: <BedIcon />, label: '2 Bedrooms' },
                { icon: <GuestsIcon />, label: '6 Guests' },
                { icon: <SizeIcon />, label: '120 m²' }
            ],
            price: 650
        }
    ];

    const handleNavigateToCheckout = () => {
        navigate(`/hotel-checkout/${id}`);
    };

    return (
        <div className="min-h-screen bg-white pb-20 pt-10">
            <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
                {/* Breadcrumbs / Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors mb-6 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    <span className="text-sm font-medium font-['Inter']">Back to listings</span>
                </button>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                    <div>
                        <h1 className="text-gray-900 text-3xl md:text-5xl font-bold font-['Inter'] leading-tight mb-3">
                            {hotel.name}
                        </h1>
                        <p className="text-gray-600 text-lg font-normal font-['Inter'] leading-7 mb-4">
                            Experience luxury, comfort, and world-class hospitality in the heart of the city.
                        </p>
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-lg">
                                <StarRatingIcon className="w-4 h-4 text-yellow-500" />
                                <span className="text-gray-900 text-sm font-bold font-['Inter']">{hotel.rating}</span>
                                <span className="text-gray-500 text-sm font-normal font-['Inter']">({hotel.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <LocationIcon className="w-3 h-4" />
                                <span className="text-sm font-medium font-['Inter']">Downtown, New York</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-sm">
                            <HeartIcon className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-sm">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 h-[300px] sm:h-[400px] md:h-[550px] gap-2 md:gap-4 mb-12 rounded-2xl overflow-hidden shadow-md">
                    <div className="col-span-2 row-span-2 relative overlow-hidden">
                        <img src={hotel.image} alt="Main" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=400" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=400" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=400" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="relative overflow-hidden group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400" alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white transition-all group-hover:bg-black/60">
                            <PhotoGalleryIcon className="w-8 h-8 mb-2 drop-shadow-lg" />
                            <span className="font-bold text-sm md:text-base px-2 text-center drop-shadow-md">View 24+ Photos</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Details */}
                    <div className="flex-1">
                        {/* Amenities */}
                        <div className="mb-12">
                            <h2 className="text-gray-900 text-2xl font-bold font-['Inter'] mb-6">Amenities</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {amenities.map((item, index) => (
                                    <div key={index} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-start gap-3 hover:shadow-sm transition-shadow">
                                        <div className="text-blue-500">{item.icon}</div>
                                        <span className="text-gray-700 text-base font-medium font-['Inter'] leading-tight">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Available Rooms */}
                        <div>
                            <h2 className="text-gray-900 text-2xl font-bold font-['Inter'] mb-6">Available Rooms</h2>
                            <div className="flex flex-col gap-4">
                                {rooms.map((room, index) => (
                                    <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-shadow">
                                        <div className="flex-1">
                                            <h3 className="text-gray-900 text-lg font-semibold font-['Inter'] mb-3">{room.name}</h3>
                                            <div className="flex flex-wrap gap-4">
                                                {room.specs.map((spec, sIndex) => (
                                                    <div key={sIndex} className="flex items-center gap-2">
                                                        <div className="text-gray-400">{spec.icon}</div>
                                                        <span className="text-gray-600 text-sm font-normal font-['Inter']">{spec.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-4 flex items-baseline gap-1">
                                                <span className="text-gray-900 text-2xl font-bold font-['Inter']">${room.price}</span>
                                                <span className="text-gray-500 text-base font-normal font-['Inter']">/ night</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleNavigateToCheckout}
                                            className="w-full md:w-auto bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                                        >
                                            Select Room
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Pricing Sidebar */}
                    <div className="lg:w-[400px]">
                        <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-gray-900 text-3xl font-bold font-['Inter']">${hotel.price}</span>
                                    <span className="text-gray-500 text-base font-normal font-['Inter']">/ night</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-8 text-green-600">
                                <CheckCircleIcon className="w-4 h-4" />
                                <span className="text-sm font-medium font-['Inter']">Available for your selected dates</span>
                            </div>

                            <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mb-4">
                                <div className="bg-white p-4">
                                    <p className="text-gray-500 text-[10px] font-bold font-['Inter'] uppercase tracking-wider mb-1">Check-in</p>
                                    <p className="text-gray-900 text-base font-medium font-['Inter']">Dec 15</p>
                                </div>
                                <div className="bg-white p-4">
                                    <p className="text-gray-500 text-[10px] font-bold font-['Inter'] uppercase tracking-wider mb-1">Check-out</p>
                                    <p className="text-gray-900 text-base font-medium font-['Inter']">Dec 18</p>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-8">
                                <p className="text-gray-500 text-[10px] font-bold font-['Inter'] uppercase tracking-wider mb-1">Guests</p>
                                <p className="text-gray-900 text-base font-medium font-['Inter']">2 Adults, 0 Children</p>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-600">
                                    <span className="text-base font-normal font-['Inter']">${hotel.price} × 3 nights</span>
                                    <span className="text-gray-900 text-base font-normal font-['Inter']">${hotel.price * 3}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span className="text-base font-normal font-['Inter']">Service fee</span>
                                    <span className="text-gray-900 text-base font-normal font-['Inter']">$25</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span className="text-base font-normal font-['Inter']">Taxes</span>
                                    <span className="text-gray-900 text-base font-normal font-['Inter']">$42</span>
                                </div>
                                <hr className="border-gray-200" />
                                <div className="flex justify-between font-bold">
                                    <span className="text-gray-900 text-lg font-semibold font-['Inter']">Total</span>
                                    <span className="text-gray-900 text-lg font-semibold font-['Inter']">${(hotel.price * 3) + 25 + 42}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleNavigateToCheckout}
                                className="w-full bg-blue-500 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors mb-4 shadow-lg shadow-blue-500/20"
                            >
                                Book Now
                            </button>

                            <p className="text-center text-gray-500 text-xs font-normal font-['Inter']">
                                You won't be charged yet
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelBookingPage;
