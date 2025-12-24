import React from 'react';
import {
    TripAdvisorLogo,
    TripAdvisorStars,
    CustomizablePackageIcon,
    PhoneSupportIcon,
    TrustedShieldIcon,
    LocalExpertIcon,
} from '../../../../assets/icons/icons';
import backgroundImage from '../../../../assets/images/background-image.png';
import sectionBg from '../../../../assets/images/Background.png';

const BestBookingPlatform = () => {
    const features = [
        {
            id: 1,
            title: 'Customizable\nPackage.',
            icon: <CustomizablePackageIcon />,
        },
        {
            id: 2,
            title: '24/7 Support',
            icon: <PhoneSupportIcon />,
        },
        {
            id: 3,
            title: 'Trusted by\nThousands',
            icon: <TrustedShieldIcon />,
        },
        {
            id: 4,
            title: 'Local Experties',
            icon: <LocalExpertIcon />,
        }
    ];

    return (
        <section
            className="w-full py-12 sm:py-16 md:py-24 px-4 md:px-8"
            style={{
                backgroundImage: `url(${sectionBg})`,
                backgroundSize: '100% 70%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top center'
            }}
        >
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 md:mb-16 gap-6 sm:gap-8">
                    <div className="max-w-7xl">
                        <h2 className="text-stone-950 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-['Poppins'] leading-tight mb-4 sm:mb-6">
                            Why We’re Best Booking Platform
                        </h2>
                        <p className="text-neutral-600 text-base sm:text-lg font-normal font-['Roboto'] leading-6 sm:leading-7 max-w-[600px]">
                            We bring flights, taxis, and hotel bookings together on one smart platform, making your travel planning simple, fast, and worry-free
                        </p>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-2 pr-4">
                        <TripAdvisorLogo className="mb-1" />
                        <div className="flex items-center gap-3">
                            <span className="text-stone-950 text-3xl font-bold font-['Poppins']">4.5</span>
                            <span className="text-neutral-600 text-lg font-semibold font-['Roboto']">Review</span>
                            <TripAdvisorStars className="scale-125 origin-left" />
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-24 md:mb-32">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="bg-white rounded-[15px] p-5 sm:p-6 md:p-8 flex items-center gap-4 sm:gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 border border-gray-50/50"
                        >
                            <div className="flex-shrink-0 size-12 sm:size-14 md:size-16 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-inner">
                                {feature.icon}
                            </div>
                            <h3 className="text-stone-950 text-base sm:text-lg md:text-xl font-bold font-['Poppins'] leading-tight whitespace-pre-line">
                                {feature.title}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* Promotional Banner */}
                <div className="relative w-full">
                    <div className="relative rounded-[40px] overflow-visible group">

                        {/* Help Box Overlay - Floating Capsule */}
                        <div className="absolute -top-8 sm:-top-12 md:-top-16 left-1/2 -translate-x-1/2 w-[98%] sm:w-[95%] max-w-[800px] z-20">
                            <div className="bg-white/80 backdrop-blur-md p-1.5 sm:p-2 rounded-full shadow-xl shadow-blue-500/10">
                                <div className="bg-[#1781FE] rounded-full px-4 py-3 sm:px-6 sm:py-4 md:px-12 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
                                    <h4 className="text-white text-[10px] sm:text-sm md:text-lg font-medium font-['Roboto'] leading-tight text-center sm:text-left">
                                        Need to Help? Don't Hesitate Friendly<br className="hidden md:block" /> Collaboarte with Experties
                                    </h4>

                                    <div className="flex items-center gap-2 sm:gap-3 md:gap-5 flex-shrink-0">
                                        <div className="size-8 sm:size-10 md:size-14 rounded-full bg-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-stone-950 sm:w-5 sm:h-5 md:w-6 md:h-6">
                                                <path d="M15.5434 11.306L12.0434 9.80597C11.8939 9.74225 11.7277 9.72882 11.5699 9.76771C11.4121 9.8066 11.2712 9.8957 11.1684 10.0216L9.61844 11.9153C7.18586 10.7684 5.22819 8.81073 4.08125 6.37815L5.975 4.82815C6.10115 4.72555 6.19044 4.58465 6.22934 4.42676C6.26825 4.26888 6.25466 4.10262 6.19063 3.95315L4.69063 0.453154C4.62035 0.292032 4.49605 0.160481 4.33917 0.081185C4.18229 0.00188911 4.00266 -0.0201814 3.83125 0.0187791L0.58125 0.768779C0.41599 0.806941 0.268545 0.899991 0.16298 1.03274C0.0574141 1.16549 -3.80691e-05 1.33011 1.89256e-08 1.49972C1.89256e-08 9.51534 6.49687 15.9997 14.5 15.9997C14.6697 15.9998 14.8343 15.9424 14.9672 15.8368C15.1 15.7313 15.1931 15.5838 15.2312 15.4185L15.9812 12.1685C16.02 11.9962 15.9974 11.8159 15.9175 11.6585C15.8376 11.501 15.7053 11.3764 15.5434 11.306Z" fill="currentColor" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white text-[9px] sm:text-[10px] md:text-sm font-medium font-['Roboto'] opacity-90">Need Help?</span>
                                            <a href="tel:+91345533865" className="text-white text-sm sm:text-base md:text-2xl font-bold font-['Poppins'] tracking-tight leading-none whitespace-nowrap">
                                                +91 345 533 865
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Banner Image */}
                        <div className="relative w-full mt-10 sm:mt-0 aspect-[4/5] sm:aspect-[2/1] md:aspect-[1232/580] rounded-[20px] sm:rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl border-2 sm:border-4 border-white/50">
                            <img
                                src={backgroundImage}
                                alt="Friends in nature"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-stone-900/10" />

                            {/* Centered Play Button */}
                            <button
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 sm:size-20 md:size-28 bg-[#1781FE] rounded-full flex items-center justify-center text-white shadow-[0_0_60px_rgba(23,129,254,0.4)] transition-all duration-500 hover:scale-110 active:scale-95 group/play z-10"
                            >
                                <svg width="30" height="34" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1.5 overflow-visible">
                                    <path d="M22.5 11.4019C24.5 12.5566 24.5 15.4434 22.5 16.5981L4.5 26.9904C2.5 28.1451 -2.14619e-06 26.7017 -2.04543e-06 24.3923L-1.13715e-06 3.60769C-1.0364e-06 1.29829 2.5 -0.145107 4.5 1.00962L22.5 11.4019Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BestBookingPlatform;


