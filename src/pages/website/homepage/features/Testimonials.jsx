import React, { useState, useEffect } from 'react';
import { TestimonialPrevIcon, TestimonialNextIcon, TestimonialStarIcon } from '../../../../assets/icons/icons';
import mapBg from '../../../../assets/images/mapbg.png';

const testimonialsData = [
    {
        id: 1,
        experience: 'Average Experience',
        content: 'This was the best trip of my life! Everything was perfectly planned, from airport pickup to guided tours. The accommodations were fantastic, and the itinerary was well-balanced. Highly recommended!',
        author: 'James Bonde',
        role: 'GoFly Traveler',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        rating: 5
    },
    {
        id: 2,
        experience: 'Great Experience!',
        content: "My life's greatest journey was this one! Everything was meticulously organized, including the guided tours and airport pickup. The schedule was well-balanced, and the lodging was excellent. I heartily suggest it!",
        author: 'Selina Henry',
        role: 'GoFly Traveler',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        rating: 5
    },
    {
        id: 3,
        experience: 'Excellent Tourist Place!',
        content: 'I had the most amazing trip of my life! Everything, including the guided excursions and the airport pickup, was meticulously organized. The itinerary was well-balanced, and the accommodations were excellent.',
        author: 'Robert Kcarery',
        role: 'GoFly Traveler',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        rating: 5
    },
    {
        id: 4,
        experience: 'Average Experience',
        content: 'The tour was well-organized, and we enjoyed every bit of it. However, I wish we had more free time to explore on our own. Overall, a great experience!',
        author: 'James Bonde',
        role: 'GoFly Traveler',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
        rating: 5
    },
    {
        id: 5,
        experience: 'Great Experience!',
        content: 'I recently used this platform to book my entire trip, including my flight, taxi, and hotel, and I must say it exceeded my expectations in every way. From the moment I opened the website, everything felt incredibly smooth and user-friendly.',
        author: 'Selina Henry',
        role: 'GoFly Traveler',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        rating: 5
    }
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            className="w-full py-20 px-4 md:px-8 bg-white relative overflow-hidden bg-center bg-no-repeat bg-contain"
            style={{ backgroundImage: `url(${mapBg})` }}
        >            <div className="max-w-7xl mx-auto text-center mb-16 px-4">
                <h2 className="text-stone-950 text-3xl md:text-5xl font-semibold font-['Poppins'] leading-tight mb-6">
                    Our Client Testimonials
                </h2>
                <p className="text-neutral-600 text-lg font-normal font-['Roboto'] leading-7 max-w-[600px] mx-auto">
                    Our customers trust us for reliable service, affordable prices, and a smooth booking experience.
                </p>
            </div>

            <div className="max-w-[1126px] mx-auto relative flex flex-col items-center">
                {/* Carousel Container */}
                <div className="relative w-full flex items-center justify-center">
                    {/* Navigation Buttons - Absolute positioning for desktop, hidden or stacked on mobile if needed */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 z-10 size-10 md:size-12 rounded-full border border-stone-950 flex items-center justify-center bg-white hover:bg-stone-950 hover:text-white transition-colors duration-300 hidden md:flex"
                        aria-label="Previous slide"
                    >
                        <TestimonialPrevIcon />
                    </button>

                    <div className="w-full max-w-[904px] h-[500px] md:h-[450px] bg-white rounded-[24px] md:rounded-[40px] shadow-[0_4px_25px_rgba(0,0,0,0.08)] px-6 py-12 md:px-20 md:py-16 mx-4 relative overflow-hidden flex flex-col items-center justify-center">
                        <div className="relative w-full h-full flex items-center justify-center">
                            {testimonialsData.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className={`w-full flex flex-col items-center transition-all duration-700 ease-in-out ${index === activeIndex ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0 translate-x-12 pointer-events-none'
                                        }`}
                                >
                                    {/* Rating Stars */}
                                    <div className="flex gap-1.5 mb-6">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <div key={i} className="size-5 md:size-6 rounded bg-[#10B981] flex items-center justify-center text-white scale-125">
                                                <TestimonialStarIcon className="size-3 md:size-3.5" />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Heading */}
                                    <h3 className="text-stone-950 text-xl font-semibold font-['Poppins'] mb-6">
                                        {testimonial.experience}
                                    </h3>

                                    {/* Quote Text */}
                                    <p className="text-neutral-600 text-lg md:text-2xl font-medium font-['Poppins'] leading-relaxed md:leading-[45px] text-center mb-8 italic">
                                        "{testimonial.content}"
                                    </p>

                                    {/* Author Info */}
                                    <div className="mt-auto">
                                        <h4 className="text-stone-950 text-lg font-semibold font-['Poppins']">
                                            {testimonial.author}
                                        </h4>
                                        <p className="text-neutral-600 text-sm md:text-base font-medium font-['Roboto']">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleNext}
                        className="absolute right-0 z-10 size-10 md:size-12 rounded-full border border-stone-950 flex items-center justify-center bg-white hover:bg-stone-950 hover:text-white transition-colors duration-300 hidden md:flex"
                        aria-label="Next slide"
                    >
                        <TestimonialNextIcon />
                    </button>

                    {/* Mobile Navigation Controls */}
                    <div className="flex md:hidden gap-6 mt-8">
                        <button onClick={handlePrev} className="size-10 rounded-full border border-stone-950 flex items-center justify-center bg-white active:bg-stone-950 active:text-white">
                            <TestimonialPrevIcon />
                        </button>
                        <button onClick={handleNext} className="size-10 rounded-full border border-stone-950 flex items-center justify-center bg-white active:bg-stone-950 active:text-white">
                            <TestimonialNextIcon />
                        </button>
                    </div>
                </div>

                {/* Author Pagination Icons */}
                <div className="flex items-center gap-4 mt-12 md:mt-16 justify-center">
                    {testimonialsData.map((testimonial, index) => (
                        <button
                            key={testimonial.id}
                            onClick={() => setActiveIndex(index)}
                            className={`relative size-12 md:size-16 rounded-full overflow-hidden transition-all duration-300 border-2 ${index === activeIndex ? 'border-[#1781FE] scale-110 shadow-lg' : 'border-transparent opacity-60 grayscale hover:grayscale-0'
                                }`}
                        >
                            <img
                                src={testimonial.image}
                                alt={testimonial.author}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
