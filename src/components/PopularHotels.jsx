import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LocationPinIcon2, ArrowSeparatorIcon, BookNowArrowIcon } from '../assets/icons/icons';

export const hotelsData = [
    {
        id: 1,
        name: 'Kiwi Adventures Await',
        location: 'New Zealand',
        rating: '4.5',
        reviews: '320',
        price: '120',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
        tags: ['sale']
    },
    {
        id: 2,
        name: 'Royal Marina Hotel',
        location: 'New Zealand',
        rating: '4.5',
        reviews: '320',
        price: '120',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
        tags: ['sale', 'adventure']
    },
    {
        id: 3,
        name: 'Alpine Retreat Lodge',
        location: 'New Zealand',
        rating: '4.8',
        reviews: '150',
        price: '200',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
        tags: []
    },
    {
        id: 4,
        name: 'Oceanic Blue Resort',
        location: 'New Zealand',
        rating: '4.7',
        reviews: '450',
        price: '180',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
        tags: ['adventure']
    },
    {
        id: 5,
        name: 'Serene Valley Resort',
        location: 'New Zealand',
        rating: '4.6',
        reviews: '280',
        price: '160',
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
        tags: ['sale']
    },
    {
        id: 6,
        name: 'Urban Luxe Hotel',
        location: 'New Zealand',
        rating: '4.9',
        reviews: '520',
        price: '250',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
        tags: ['sale', 'adventure']
    },
    {
        id: 7,
        name: 'Oceanic Blue Resort',
        location: 'New Zealand',
        rating: '4.7',
        reviews: '450',
        price: '180',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
        tags: ['adventure']
    },
    {
        id: 8,
        name: 'Serene Valley Resort',
        location: 'New Zealand',
        rating: '4.6',
        reviews: '280',
        price: '160',
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
        tags: ['sale']
    },
    {
        id: 9,
        name: 'Urban Luxe Hotel',
        location: 'New Zealand',
        rating: '4.9',
        reviews: '520',
        price: '250',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
        tags: ['sale', 'adventure']
    }
];

const PopularHotels = ({ data = hotelsData, displayTitle = true }) => {
    const navigate = useNavigate();

    const handleBookNow = (id) => {
        navigate(`/hotel-booking/${id}`);
    };

    return (
        <section className={`w-full ${displayTitle ? 'py-20' : 'py-0'} px-4 md:px-8`}>
            <div className="max-w-[1200px] mx-auto">
                {displayTitle && (
                    <div className="flex flex-col items-center text-center mb-16">
                        <h2 className="text-stone-950 text-3xl md:text-4xl font-semibold font-['Poppins'] leading-tight mb-4">
                            Popular Available Hotels
                        </h2>
                        <p className="text-neutral-600 text-lg font-normal font-['Roboto'] leading-7 max-w-[600px]">
                            A curated list of the most popular Available Hotels based on different destinations.
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {data && data.length > 0 ? data.map((hotel) => (
                        <div
                            key={hotel.id}
                            className="group bg-white rounded-[20px] border border-gray-200 p-3 transition-all duration-300 hover:shadow-xl"
                        >
                            {/* Image Container */}
                            <div className="relative w-full aspect-[320/208] rounded-[10px] overflow-hidden mb-5">
                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Tags Overlay */}
                                {hotel.tags?.includes('sale') && (
                                    <div className="absolute top-3 left-3">
                                        <div className="bg-[#FF3B30] text-white px-3 py-1.5 rounded-full text-xs font-bold font-['Poppins'] shadow-lg">
                                            Sale on!
                                        </div>
                                    </div>
                                )}
                                {hotel.tags?.includes('adventure') && (
                                    <div className="absolute top-3 right-3">
                                        <div className="bg-[#FFD600] text-stone-950 px-3 py-1.5 rounded-full text-xs font-bold font-['Poppins'] shadow-lg">
                                            Adventure Tour
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="px-2 pb-2">
                                <h3 className="text-stone-950 text-xl font-semibold font-['Poppins'] leading-7 mb-4 truncate">
                                    {hotel.name}
                                </h3>

                                <div className="flex items-center gap-2 mb-6 text-neutral-600">
                                    <div className="flex items-center gap-1.5 min-w-fit">
                                        <LocationPinIcon2 className="text-[#525252]" />
                                        <span className="text-sm font-semibold font-['Poppins'] leading-none">
                                            {hotel.location}
                                        </span>
                                    </div>

                                    <ArrowSeparatorIcon className="text-[#525252] flex-shrink-0" />

                                    <div className="flex items-center gap-1 min-w-fit">
                                        <span className="text-sm">⭐</span>
                                        <span className="text-sm font-semibold font-['Poppins'] leading-none">
                                            {hotel.rating} ({hotel.reviews} reviews)
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    <button
                                        onClick={() => handleBookNow(hotel.id)}
                                        className="bg-[#3B71FE] text-white px-5 py-2.5 rounded-[10px] flex items-center gap-3 transition-colors duration-300 hover:bg-[#2b56cb]"
                                    >
                                        <span className="text-base font-semibold font-['Poppins'] leading-none">Book Now</span>
                                        <BookNowArrowIcon className="text-white" />
                                    </button>

                                    <div className="text-right">
                                        <p className="text-neutral-600 text-sm font-semibold font-['Roboto'] leading-none mb-1">
                                            Per Night
                                        </p>
                                        <p className="text-stone-950 text-2xl font-semibold font-['Poppins'] leading-none">
                                            From ${hotel.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-3 text-center py-12">
                            <p className="text-gray-500">No hotels available at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PopularHotels;
