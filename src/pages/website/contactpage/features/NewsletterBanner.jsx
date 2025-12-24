import React from 'react';
import { IoMdSend } from "react-icons/io";

const NewsletterBanner = () => {
    return (
        <section className="w-full lg:w-[94%] mx-auto py-16">
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-[45px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden relative">
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-20 -translate-y-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -translate-x-20 translate-y-20 blur-3xl"></div>

                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-white text-3xl md:text-5xl font-extrabold font-['Poppins'] mb-4 leading-tight">
                        Subscribe to Our Newsletter
                    </h2>
                    <p className="text-blue-50 text-lg md:text-xl font-medium font-['Roboto'] opacity-90">
                        Get the latest travel tips, exclusive hotel deals, and special offers delivered straight to your inbox.
                    </p>
                </div>

                <div className="relative z-10 w-full lg:w-auto min-w-[320px] md:min-w-[450px]">
                    <div className="bg-white p-2 rounded-2xl flex items-center shadow-lg">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-6 h-12 bg-transparent outline-none text-stone-950 font-medium font-['Roboto']"
                        />
                        <button className="bg-blue-500 text-white px-4 md:px-8 h-12 rounded-xl font-bold font-['Poppins'] hover:bg-stone-950 transition-colors whitespace-nowrap flex items-center justify-center">
                            <span className="hidden md:inline">Subscribe</span>
                            <IoMdSend className="md:hidden text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterBanner;
