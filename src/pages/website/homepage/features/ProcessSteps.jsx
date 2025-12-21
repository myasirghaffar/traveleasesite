import React from 'react';
import { ProcessStepBgIcon, OneClickBookingIcon, EverythingInOnePlaceIcon, ReliableSupportIcon } from '../../../../assets/icons/icons';

const steps = [
    {
        id: 1,
        title: "One Click Booking.",
        description: "You can hassle-free and fast Hotel Booking package booking by GoFly.",
        icon: <OneClickBookingIcon className="size-12" />
    },
    {
        id: 2,
        title: "Everything in One Place",
        description: "Book flights, taxis, and hotels from a single platform without any hassle.",
        icon: <EverythingInOnePlaceIcon className="size-12" />
    },
    {
        id: 3,
        title: "Reliable Support",
        description: "Enjoy budget-friendly prices, exclusive offers, and transparent rates",
        icon: <ReliableSupportIcon className="size-12" />
    }
];

const ProcessSteps = () => {
    return (
        <section className="w-full py-12 px-4 md:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {steps.map((step) => (
                        <div key={step.id} className="relative bg-white rounded-[20px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.11)] p-8 md:p-10 overflow-hidden min-h-[240px] flex flex-col justify-center transition-all duration-300 hover:shadow-[0px_10px_25px_0px_rgba(0,0,0,0.08)]">
                            {/* Decorative Background Pattern */}
                            <div className="absolute top-0 right-0 pointer-events-none opacity-40 translate-x-4 -translate-y-4 md:translate-x-0 md:translate-y-0">
                                <ProcessStepBgIcon className="size-32 md:size-36" />
                            </div>

                            {/* Icon Container */}
                            <div className="relative z-10 mb-6">
                                <div className="size-12 flex items-center justify-center">
                                    {step.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-stone-950 text-xl md:text-2xl font-semibold font-['Poppins'] leading-tight mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-neutral-600 text-sm md:text-base font-medium font-['Roboto'] leading-relaxed max-w-[280px]">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSteps;
