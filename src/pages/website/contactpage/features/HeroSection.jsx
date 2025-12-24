import herobgimage from '../../../../assets/images/herobgimg.png';

const HeroSection = () => {
    return (
        <section className="relative w-full lg:w-[94%] mx-auto rounded-[45px] overflow-hidden min-h-[300px] lg:min-h-[400px] flex items-center justify-center">
            {/* Background Image and Overlay */}
            <div className="absolute inset-0">
                <img
                    src={herobgimage}
                    alt="Contact Us Banner"
                    className="w-full h-full object-cover mx-auto block"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-0 bg-gradient-to-b from-stone-950/25 to-stone-950/25" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4">
                <h1 className="text-white text-5xl md:text-6xl font-extrabold font-['Poppins'] leading-tight text-center max-w-[800px] mb-4">
                    Contact Us
                </h1>
                <p className="text-white text-lg md:text-xl font-medium font-['Roboto'] leading-7 text-center max-w-[600px]">
                    We're here to help you with your journey. Reach out to us anytime.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
