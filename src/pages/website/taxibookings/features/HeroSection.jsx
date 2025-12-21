const HeroSection = () => {
    return (
        <section className="relative w-full mx-auto rounded-[45px] overflow-hidden min-h-[550px] md:min-h-[650px] flex items-center justify-center">
            {/* Background Image and Overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1920"
                    alt="City Taxi"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 to-stone-950/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 -translate-y-2">
                <h1 className="text-white text-5xl md:text-6xl font-extrabold font-['Poppins'] leading-tight text-center max-w-[900px] mb-6 drop-shadow-lg">
                    Reliable Taxi Services for Your Every Journey
                </h1>
                <p className="text-white text-xl font-semibold font-['Roboto'] leading-7 text-center max-w-[700px] drop-shadow-md">
                    Fast, safe, and comfortable rides at your fingertips. Choose from a variety of vehicles tailored to your needs.
                </p>
                <button className="bg-blue-500 text-white mt-8 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all duration-300 shadow-xl hover:scale-105 active:scale-95">
                    Ride Now
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
