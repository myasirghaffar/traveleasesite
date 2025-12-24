import herobgimage from '../../../../assets/images/herobgimg.png';

const HeroSection = () => {
    return (
        <section className="relative w-full lg:w-[94%] mx-auto rounded-[45px] overflow-hidden min-h-[500px] lg:min-h-[530px] flex items-center justify-center">
            {/* Background Image and Overlay */}
            <div className="absolute inset-0">
                <img
                    src={herobgimage}
                    alt="Travel Banner"
                    className="w-full h-full object-cover mx-auto block"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-0 bg-gradient-to-b from-stone-950/25 to-stone-950/25" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 -translate-y-20">
                <h1 className="text-white text-3xl md:text-5xl font-extrabold font-['Poppins'] leading-tight text-center max-w-[800px] mb-6">
                    Find Your Perfect Stay, Anytime, Anywhere
                </h1>
                <p className="text-white text-md md:text-xl font-medium lg:font-semibold font-['Roboto'] leading-7 text-center max-w-[600px]">
                    Discover top-rated hotels and seamless travel options designed to make your journey effortless
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
