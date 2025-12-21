import React from 'react';
import {
    HotelBookingSolutionIcon,
    FlightBookingSolutionIcon,
    TaxiBookingSolutionIcon
} from '../../../../assets/icons/icons';

const BookingSolution = () => {
    const solutions = [
        {
            title: "Instant Hotel Booking",
            description: "Book hotels instantly with best price guarantee and free cancellation",
            buttonText: "Explore Hotels",
            icon: HotelBookingSolutionIcon,
            bgColor: "bg-blue-100",
            btnColor: "bg-blue-500 hover:bg-blue-600"
        },
        {
            title: "Easy Flight Booking",
            description: "Compare and book flights from hundreds of airlines worldwide",
            buttonText: "Book Flights",
            icon: FlightBookingSolutionIcon,
            bgColor: "bg-green-100/30",
            btnColor: "bg-green-600 hover:bg-green-700"
        },
        {
            title: "Reliable Taxi Service",
            description: "Book airport transfers and city rides with trusted drivers",
            buttonText: "Book Taxi",
            icon: TaxiBookingSolutionIcon,
            bgColor: "bg-yellow-100/30",
            btnColor: "bg-yellow-600 hover:bg-yellow-700"
        }
    ];

    return (
        <section className="w-full py-20 px-4 md:px-8 bg-[#E6F0FF]/70">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-gray-900 text-3xl md:text-4xl font-bold font-['Inter'] leading-tight mb-4">
                        Complete Booking Solutions
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl font-normal font-['Inter'] leading-7">
                        Everything you need for seamless travel
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {solutions.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="w-full max-w-[380px] bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-[0px_10px_15px_0px_rgba(0,0,0,0.10),0px_4px_6px_0px_rgba(0,0,0,0.10)] border border-gray-100 transition-transform duration-300 hover:-translate-y-2"
                            >
                                <div className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mb-6`}>
                                    <Icon className="w-1/2 h-1/2" />
                                </div>

                                <h3 className="text-gray-900 text-2xl font-semibold font-['Inter'] mb-4">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 text-base font-normal font-['Inter'] mb-8 min-h-[48px]">
                                    {item.description}
                                </p>

                                <button className={`px-8 py-3 rounded-lg text-white font-medium transition-colors duration-300 ${item.btnColor}`}>
                                    {item.buttonText}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BookingSolution;
