import React, { useState, useRef, useEffect } from 'react';
import image51 from '../../../../assets/images/Image-51.png';
import image53 from '../../../../assets/images/Image-53.png';
import image54 from '../../../../assets/images/Image-54.png';
import image56 from '../../../../assets/images/Image-56.png';

const destinationsData = [
    { id: 1, name: 'Jordan', tours: '01', image: image51 },
    { id: 2, name: 'Qatar', tours: '01', image: image53 },
    { id: 3, name: 'Oman', tours: '00', image: image54 },
    { id: 4, name: 'Saudi Arabia', tours: '01', image: image56 },
    { id: 5, name: 'Egypt', tours: '05', image: image53 },
];

const TopDestinationCarousel = () => {
    const itemsCount = destinationsData.length;
    const destinations = [...destinationsData, ...destinationsData, ...destinationsData];

    const [activeIndex, setActiveIndex] = useState(itemsCount);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [visibleItems, setVisibleItems] = useState(4);

    const dragStart = useRef(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const updateVisibleItems = () => {
            if (window.innerWidth < 640) setVisibleItems(1);
            else if (window.innerWidth < 1024) setVisibleItems(2);
            else setVisibleItems(4);
        };
        updateVisibleItems();
        window.addEventListener('resize', updateVisibleItems);
        return () => window.removeEventListener('resize', updateVisibleItems);
    }, []);

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (activeIndex >= itemsCount * 2) {
            setActiveIndex(activeIndex - itemsCount);
        } else if (activeIndex < itemsCount) {
            setActiveIndex(activeIndex + itemsCount);
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        dragStart.current = e.pageX;
        setIsTransitioning(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const delta = e.pageX - dragStart.current;
        setDragOffset(delta);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = 50;
        if (Math.abs(dragOffset) > threshold) {
            const direction = dragOffset > 0 ? -1 : 1;
            setIsTransitioning(true);
            setActiveIndex(prev => prev + direction);
        }
        setDragOffset(0);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        dragStart.current = e.touches[0].pageX;
        setIsTransitioning(false);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const delta = e.touches[0].pageX - dragStart.current;
        setDragOffset(delta);
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = 50;
        if (Math.abs(dragOffset) > threshold) {
            const direction = dragOffset > 0 ? -1 : 1;
            setIsTransitioning(true);
            setActiveIndex(prev => prev + direction);
        }
        setDragOffset(0);
    };

    const handleDotClick = (index) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveIndex(index + itemsCount);
    };

    const currentDot = activeIndex % itemsCount;
    const gapWidth = 24; // gap-6
    const totalGapsVisible = (visibleItems - 1) * gapWidth;
    const itemWidthCalc = `calc((100% - ${totalGapsVisible}px) / ${visibleItems})`;
    const translationCalc = `translateX(calc(-${activeIndex} * (100% / ${visibleItems} + ${gapWidth / visibleItems}px) + ${dragOffset}px))`;

    return (
        <section className="w-full py-16 px-4 md:px-8 overflow-hidden select-none">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-stone-950 text-3xl md:text-4xl font-semibold font-['Poppins'] text-center mb-12">
                    Top Destinations
                </h2>

                <div
                    className={`relative cursor-${isDragging ? 'grabbing' : 'grab'}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        ref={containerRef}
                        className={`flex gap-6 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                        style={{
                            transform: translationCalc,
                        }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {destinations.map((dest, idx) => (
                            <div
                                key={`${dest.id}-${idx}`}
                                className="group flex flex-col items-center pointer-events-none px-6 sm:px-0"
                                style={{ minWidth: itemWidthCalc }}
                            >
                                <div className="relative w-full aspect-[268/300] rounded-[20px] overflow-hidden mb-6">
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 13L13 1M13 1H4M13 1V10" stroke="#110F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center text-stone-950">
                                    <h3 className="text-lg md:text-xl font-semibold font-['Poppins'] leading-6 mb-1">
                                        {dest.name}
                                    </h3>
                                    <p className="text-neutral-600 text-sm md:text-base font-semibold font-['Roboto'] leading-4">
                                        Tours ({dest.tours})
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center items-center gap-3 mt-12 pb-4">
                    {destinationsData.map((_, dot) => (
                        <button
                            key={dot}
                            onClick={() => handleDotClick(dot)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${currentDot === dot
                                ? 'w-[30px] bg-[#3B71FE]'
                                : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopDestinationCarousel;
