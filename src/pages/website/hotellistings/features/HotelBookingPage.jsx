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
import { useGetHotelByIdQuery } from '../../../../services/Api';
import { getImageUrl } from '../../../../services/ApiEndpoints';

// Helper function to map amenity strings to icons
const getAmenityIcon = (amenityName) => {
    const lowerName = amenityName?.toLowerCase() || '';
    if (lowerName.includes('wifi') || lowerName.includes('wi-fi') || lowerName === 'wi-fi') {
        return <WifiIcon />;
    } else if (lowerName.includes('parking')) {
        return <ParkingIcon />;
    } else if (lowerName.includes('air') || lowerName.includes('conditioning') || lowerName === 'a/c' || lowerName === 'ac') {
        return <AirConditioningIcon />;
    } else if (lowerName.includes('breakfast')) {
        return <BreakfastIcon />;
    } else if (lowerName.includes('pool')) {
        return <PoolIcon />;
    } else if (lowerName.includes('gym') || lowerName.includes('fitness')) {
        return <GymIcon />;
    } else if (lowerName.includes('shuttle') || lowerName.includes('airport')) {
        return <AirportShuttleIcon />;
    }
    // Default icon if no match
    return <WifiIcon />;
};

const HotelBookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const { data: hotelData, isLoading: isLoadingHotel, error: hotelError } = useGetHotelByIdQuery(id);

    // Transform API data - note: API returns { data: { hotel: {...} } }
    const hotelInfo = hotelData?.data?.hotel || hotelData?.data;
    const hotel = hotelInfo ? {
        id: hotelInfo.id,
        name: hotelInfo.name || 'Hotel',
        description: hotelInfo.description || '',
        city: hotelInfo.city || '',
        country: hotelInfo.country || '',
        address: hotelInfo.address || '',
        location: hotelInfo.address 
            ? `${hotelInfo.address}, ${hotelInfo.city || ''}, ${hotelInfo.country || ''}`.replace(/^,\s*|,\s*$/g, '')
            : hotelInfo.city 
                ? `${hotelInfo.city}${hotelInfo.country ? `, ${hotelInfo.country}` : ''}`
                : 'Unknown Location',
        rating: hotelInfo.rating?.toString() || '0',
        reviews: hotelInfo.total_reviews?.toString() || '0',
        price: parseFloat(hotelInfo.price || hotelInfo.base_price_per_night || 0),
        image: getImageUrl(hotelInfo.cover_image_url) || getImageUrl(hotelInfo.gallery_images?.[0]) || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
        galleryImages: hotelInfo.gallery_images || [],
        amenities: hotelInfo.amenities || [],
    } : null;
    
    // Transform rooms data from hotel API response
    const rooms = hotelInfo?.rooms?.map(room => ({
        id: room.id,
        name: room.name || 'Standard Room',
        specs: [
            { icon: <BedIcon />, label: room.bed_type || 'Standard Bed' },
            { icon: <GuestsIcon />, label: `${room.guest_capacity || 2} Guests` },
            { icon: <SizeIcon />, label: `${room.room_size ? parseFloat(room.room_size).toFixed(0) : 25} m²` }
        ],
        price: parseFloat(room.price_per_night || 0)
    })) || [];

    // Map amenities from API to icons
    const amenities = hotel?.amenities?.map(amenity => ({
        icon: getAmenityIcon(amenity),
        label: amenity
    })) || [];

    const handleNavigateToCheckout = () => {
        navigate(`/hotel-checkout/${id}`);
    };

    if (isLoadingHotel) {
        return (
            <div className="min-h-screen bg-white pb-20 pt-10 flex items-center justify-center">
                <p className="text-gray-500">Loading hotel details...</p>
            </div>
        );
    }

    if (hotelError || !hotel) {
        return (
            <div className="min-h-screen bg-white pb-20 pt-10 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">Error loading hotel details.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-blue-500 hover:underline"
                    >
                        Back to listings
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-8 sm:pb-12 md:pb-20 pt-4 sm:pt-6 md:pt-10">
            <div className="max-w-[1240px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                {/* Breadcrumbs / Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors mb-4 sm:mb-6 group min-h-[44px] [touch-action:manipulation]"
                    aria-label="Go back to listings"
                >
                    <span className="group-hover:-translate-x-1 transition-transform text-lg sm:text-xl">←</span>
                    <span className="text-xs sm:text-sm font-medium font-['Inter']">Back to listings</span>
                </button>

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 sm:mb-8 gap-4 sm:gap-6">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-['Inter'] leading-tight mb-2 sm:mb-3 break-words">
                            {hotel.name}
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base md:text-lg font-normal font-['Inter'] leading-relaxed sm:leading-7 mb-3 sm:mb-4 break-words">
                            {hotel.description || 'Experience luxury, comfort, and world-class hospitality in the heart of the city.'}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6">
                            <div className="flex items-center gap-2 bg-yellow-50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg">
                                <StarRatingIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                                <span className="text-gray-900 text-xs sm:text-sm font-bold font-['Inter'] whitespace-nowrap">{hotel.rating}</span>
                                <span className="text-gray-500 text-xs sm:text-sm font-normal font-['Inter'] whitespace-nowrap">({hotel.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500 min-w-0">
                                <LocationIcon className="w-3 h-3 sm:w-3.5 sm:h-4 flex-shrink-0" />
                                <span className="text-xs sm:text-sm font-medium font-['Inter'] truncate">{hotel.location}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                        <button 
                            className="min-w-[44px] min-h-[44px] p-2.5 sm:p-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-sm [touch-action:manipulation]"
                            aria-label="Add to favorites"
                        >
                            <HeartIcon className="w-5 h-5 text-gray-600" />
                        </button>
                        <button 
                            className="min-w-[44px] min-h-[44px] p-2.5 sm:p-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-sm [touch-action:manipulation]"
                            aria-label="Share"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Gallery Grid - Mobile First Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-rows-[auto_auto_auto_auto] sm:grid-rows-2 h-auto sm:h-[300px] md:h-[400px] lg:h-[550px] gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
                    {/* Main Image - Full width on mobile, 2x2 on larger screens */}
                    <div className="col-span-1 sm:col-span-2 sm:row-span-2 relative overflow-hidden min-h-[250px] sm:min-h-0">
                        <img src={hotel.image} alt="Main hotel view" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    {/* Gallery Images */}
                    {hotel.galleryImages && hotel.galleryImages.length > 0 ? (
                        <>
                            {hotel.galleryImages.slice(0, 3).map((img, idx) => (
                                <div key={idx} className="relative overflow-hidden min-h-[150px] sm:min-h-0 hidden sm:block">
                                    <img src={getImageUrl(img)} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                                </div>
                            ))}
                            {hotel.galleryImages.length > 3 && (
                                <div className="relative overflow-hidden group cursor-pointer min-h-[150px] sm:min-h-0 hidden sm:block [touch-action:manipulation]">
                                    <img src={getImageUrl(hotel.galleryImages[3])} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white transition-all group-hover:bg-black/60">
                                        <PhotoGalleryIcon className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 drop-shadow-lg" />
                                        <span className="font-bold text-xs sm:text-sm md:text-base px-2 text-center drop-shadow-md">View {hotel.galleryImages.length}+ Photos</span>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="relative overflow-hidden min-h-[150px] sm:min-h-0 hidden sm:block">
                                <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=400" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="relative overflow-hidden min-h-[150px] sm:min-h-0 hidden sm:block">
                                <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=400" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="relative overflow-hidden min-h-[150px] sm:min-h-0 hidden sm:block">
                                <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=400" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="relative overflow-hidden group cursor-pointer min-h-[150px] sm:min-h-0 hidden sm:block [touch-action:manipulation]">
                                <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400" alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white transition-all group-hover:bg-black/60">
                                    <PhotoGalleryIcon className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 drop-shadow-lg" />
                                    <span className="font-bold text-xs sm:text-sm md:text-base px-2 text-center drop-shadow-md">View 24+ Photos</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Main Content Layout - Flex container for sidebar and content */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start">
                    {/* Main Content Column */}
                    <div className="flex-1 order-2 lg:order-1 min-w-0">
                    {/* Amenities */}
                    {amenities.length > 0 && (
                        <div className="mb-8 sm:mb-10 md:mb-12">
                            <h2 className="text-gray-900 text-xl sm:text-2xl font-bold font-['Inter'] mb-4 sm:mb-6">Amenities</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                                {amenities.map((item, index) => (
                                    <div key={index} className="bg-white border border-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col items-start gap-2 sm:gap-3 hover:shadow-sm transition-shadow min-h-[80px] sm:min-h-[100px]">
                                        <div className="text-blue-500 flex-shrink-0">{item.icon}</div>
                                        <span className="text-gray-700 text-sm sm:text-base font-medium font-['Inter'] leading-tight break-words">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Available Rooms */}
                    <div>
                        <h2 className="text-gray-900 text-xl sm:text-2xl font-bold font-['Inter'] mb-4 sm:mb-6">Available Rooms</h2>
                        {isLoadingHotel ? (
                            <p className="text-gray-500 text-sm sm:text-base">Loading rooms...</p>
                        ) : rooms.length > 0 ? (
                            <div className="flex flex-col gap-4 sm:gap-6">
                                {rooms.map((room, index) => (
                                    <div key={room.id || index} className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 hover:shadow-md transition-shadow">
                                        <div className="flex-1 w-full min-w-0">
                                            <h3 className="text-gray-900 text-base sm:text-lg font-semibold font-['Inter'] mb-2 sm:mb-3 break-words">{room.name}</h3>
                                            <div className="flex flex-wrap gap-3 sm:gap-4 mb-3 sm:mb-4">
                                                {room.specs.map((spec, sIndex) => (
                                                    <div key={sIndex} className="flex items-center gap-1.5 sm:gap-2">
                                                        <div className="text-gray-400 flex-shrink-0">{spec.icon}</div>
                                                        <span className="text-gray-600 text-xs sm:text-sm font-normal font-['Inter'] whitespace-nowrap">{spec.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-gray-900 text-xl sm:text-2xl font-bold font-['Inter']">${room.price.toFixed(2)}</span>
                                                <span className="text-gray-500 text-sm sm:text-base font-normal font-['Inter']">/ night</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleNavigateToCheckout}
                                            className="w-full md:w-auto bg-blue-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 transition-colors min-h-[44px] [touch-action:manipulation] text-sm sm:text-base whitespace-nowrap"
                                            aria-label={`Select ${room.name}`}
                                        >
                                            Select Room
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm sm:text-base">No rooms available at this time.</p>
                        )}
                    </div>
                    </div>

                    {/* Pricing Sidebar - Show first on mobile (order-1), last on desktop (order-2) */}
                    <div className="w-full lg:w-[400px] order-1 lg:order-2 lg:flex-shrink-0">
                        <div className="lg:sticky lg:top-24 bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 shadow-sm">
                            <div className="flex justify-between items-center mb-3 sm:mb-4">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-gray-900 text-2xl sm:text-3xl font-bold font-['Inter']">${hotel.price.toFixed(2)}</span>
                                    <span className="text-gray-500 text-sm sm:text-base font-normal font-['Inter']">/ night</span>
                                </div>
                            </div>

                            <div className="flex items-start sm:items-center gap-2 mb-6 sm:mb-8 text-green-600">
                                <CheckCircleIcon className="w-4 h-4 flex-shrink-0 mt-0.5 sm:mt-0" />
                                <span className="text-xs sm:text-sm font-medium font-['Inter'] leading-relaxed">Available for your selected dates</span>
                            </div>

                            <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mb-4">
                                <div className="bg-white p-3 sm:p-4">
                                    <p className="text-gray-500 text-[10px] sm:text-[10px] font-bold font-['Inter'] uppercase tracking-wider mb-1">Check-in</p>
                                    <p className="text-gray-900 text-sm sm:text-base font-medium font-['Inter']">Dec 15</p>
                                </div>
                                <div className="bg-white p-3 sm:p-4">
                                    <p className="text-gray-500 text-[10px] sm:text-[10px] font-bold font-['Inter'] uppercase tracking-wider mb-1">Check-out</p>
                                    <p className="text-gray-900 text-sm sm:text-base font-medium font-['Inter']">Dec 18</p>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8">
                                <p className="text-gray-500 text-[10px] sm:text-[10px] font-bold font-['Inter'] uppercase tracking-wider mb-1">Guests</p>
                                <p className="text-gray-900 text-sm sm:text-base font-medium font-['Inter']">2 Adults, 0 Children</p>
                            </div>

                            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                                <div className="flex justify-between text-gray-600">
                                    <span className="text-sm sm:text-base font-normal font-['Inter']">${hotel.price.toFixed(2)} × 3 nights</span>
                                    <span className="text-gray-900 text-sm sm:text-base font-normal font-['Inter']">${(hotel.price * 3).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span className="text-sm sm:text-base font-normal font-['Inter']">Service fee</span>
                                    <span className="text-gray-900 text-sm sm:text-base font-normal font-['Inter']">$25.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span className="text-sm sm:text-base font-normal font-['Inter']">Taxes</span>
                                    <span className="text-gray-900 text-sm sm:text-base font-normal font-['Inter']">$42.00</span>
                                </div>
                                <hr className="border-gray-200" />
                                <div className="flex justify-between font-bold">
                                    <span className="text-gray-900 text-base sm:text-lg font-semibold font-['Inter']">Total</span>
                                    <span className="text-gray-900 text-base sm:text-lg font-semibold font-['Inter']">${((hotel.price * 3) + 25 + 42).toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleNavigateToCheckout}
                                className="w-full bg-blue-500 text-white py-3.5 sm:py-4 rounded-xl font-bold hover:bg-blue-600 active:bg-blue-700 transition-colors mb-3 sm:mb-4 shadow-lg shadow-blue-500/20 min-h-[44px] [touch-action:manipulation] text-sm sm:text-base"
                                aria-label="Book now"
                            >
                                Book Now
                            </button>

                            <p className="text-center text-gray-500 text-[10px] sm:text-xs font-normal font-['Inter']">
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
