const HeroSection = () => {
    return (
        <section className="relative w-full mx-auto rounded-[45px] overflow-hidden min-h-[550px] md:min-h-[650px] flex items-center justify-center">
            {/* Background Image and Overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1920"
                    alt="Luxury Hotel"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 to-stone-950/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 -translate-y-2">
                <h1 className="text-white text-5xl md:text-6xl font-extrabold font-['Poppins'] leading-tight text-center max-w-[800px] mb-6">
                    Find Your Perfect Stay, Anytime, Anywhere
                </h1>
                <p className="text-white text-xl font-semibold font-['Roboto'] leading-7 text-center max-w-[600px]">
                    Discover top-rated hotels and seamless travel options designed to make your journey effortless
                </p>
                <button className="bg-blue-500 text-white mt-5 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors duration-300">
                    Book Now
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
