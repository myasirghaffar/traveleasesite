import React, { useState } from 'react';
import { FaqChevronUpIcon, FaqChevronDownIcon } from '../../../../assets/icons/icons';

const faqData = [
    {
        id: 1,
        question: "How does this platform work?",
        answer: "Our platform allows you to book flights, taxis, and hotel stays in one place. Simply select your service, enter your details, compare options, and confirm your booking instantly."
    },
    {
        id: 2,
        question: "Are the prices fixed or do they include hidden charges?",
        answer: "All prices shown on our platform are transparent and include necessary taxes. There are no hidden charges. What you see is what you pay."
    },
    {
        id: 3,
        question: "Can I Book Flights, Hotels, and Tours Separately?",
        answer: "Yes, you can book each service individually or combine them for a complete travel package. Our platform offers full flexibility to suit your needs."
    },
    {
        id: 4,
        question: "Do You Provide Visa Assistance?",
        answer: "While we specialize in bookings, we provide essential travel documentation that can assist in your visa application process."
    },
    {
        id: 5,
        question: "What Payment Methods Do You Accept?",
        answer: "We accept all major credit cards, debit cards, and popular digital payment wallets to ensure a seamless transaction experience."
    },
    {
        id: 6,
        question: "Can I modify or cancel my booking?",
        answer: "Yes, modifications and cancellations can be made through your dashboard. Please refer to the specific service provider's policy for any applicable fees."
    }
];

const FaqSection = () => {
    const [openId, setOpenId] = useState(1);

    const toggleFaq = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="w-full py-20 px-4 md:px-8 bg-white overflow-hidden">
            <div className="max-w-[856px] mx-auto">
                <div className="text-center mb-12 px-4">
                    <h2 className="text-stone-950 text-2xl md:text-4xl font-semibold font-['Poppins'] leading-tight mb-4">
                        Questions & Answer
                    </h2>
                    <p className="text-neutral-600 text-base md:text-lg font-normal font-['Roboto'] leading-7 max-w-[520px] mx-auto">
                        We’re committed to offering more than just products—we provide exceptional experiences.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {faqData.map((item) => {
                        const isOpen = openId === item.id;
                        return (
                            <div
                                key={item.id}
                                className={`rounded-[10px] overflow-hidden transition-all duration-300 border ${isOpen ? 'border-[#1781FE] bg-white' : 'border-transparent bg-zinc-100'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFaq(item.id)}
                                    className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-300 ${isOpen ? 'bg-white' : ''
                                        }`}
                                >
                                    <span className={`text-base md:text-lg font-semibold font-['Poppins'] leading-6 ${isOpen ? 'text-stone-950' : 'text-stone-950'
                                        }`}>
                                        {item.question}
                                    </span>
                                    <div className="flex-shrink-0 ml-4">
                                        {isOpen ? (
                                            <FaqChevronUpIcon className="text-[#1781FE]" />
                                        ) : (
                                            <FaqChevronDownIcon className="text-[#525252]" />
                                        )}
                                    </div>
                                </button>

                                {/* Content with smooth height transition */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-height-[500px] opacity-100 pb-6' : 'max-height-0 opacity-0'
                                        }`}
                                    style={{ maxHeight: isOpen ? '500px' : '0' }}
                                >
                                    <div className="px-6 text-neutral-600 text-base md:text-lg font-normal font-['Roboto'] leading-7 border-t border-transparent">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
