import React from "react";
import { Link } from "react-router-dom";
import footerBg from "../../assets/images/footerbg.png";
import {
  FooterLogo,
  FooterLogoText,
  FooterLogoIcon,
  SocialMedia1,
  SocialMedia2,
  SocialMedia3,
  SocialMedia4,
} from "../../assets/icons/icons";

const Footer = () => {
  return (
    <footer
      className="bg-[#060B27] text-white relative overflow-hidden border-t border-neutral-800 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Logo & Info */}
          <div className="flex flex-col space-y-6">
            <Link to="/" className="flex items-start gap-3">
              <FooterLogoIcon className="w-[37px] h-[46px]" />
              <div className="flex flex-col gap-1.5 mt-1">
                <FooterLogoText className="w-[58px] h-[26px]" />
                <FooterLogo className="w-[69px] h-[12px]" />
              </div>
            </Link>

            <div className="text-neutral-400 text-base font-semibold font-['Poppins']">
              GoFly Travel
            </div>

            <div className="flex flex-col gap-1 text-neutral-400 text-base font-normal font-['Roboto']">
              <p>Skyline Plaza, 5th Floor, 123 Main Street</p>
              <p>Los Angeles, CA 90001, USA</p>
            </div>

            <div className="flex items-center gap-4">
              <Link to="#" className="w-7 h-7 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors">
                <SocialMedia1 className="w-[15px] h-[15px]" />
              </Link>
              <Link to="#" className="w-7 h-7 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors">
                <SocialMedia2 className="w-[15px] h-[15px]" />
              </Link>
              <Link to="#" className="w-7 h-7 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors">
                <SocialMedia3 className="w-[15px] h-[15px]" />
              </Link>
              <Link to="#" className="w-7 h-7 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors">
                <SocialMedia4 className="w-[15px] h-[15px]" />
              </Link>
            </div>
          </div>

          {/* Column 2: Top Destination */}
          <div className="flex flex-col space-y-4">
            <h5 className="text-white text-xl font-semibold font-['Roboto'] mb-2">Top Destination</h5>
            <Link to="#" className="text-neutral-400 text-base font-medium font-['Roboto'] hover:text-white transition-colors">Maldives</Link>
            <Link to="#" className="text-neutral-400 text-base font-medium font-['Roboto'] hover:text-white transition-colors">Bali, Indonesia</Link>
            <Link to="#" className="text-neutral-400 text-base font-medium font-['Roboto'] hover:text-white transition-colors">Thailand</Link>
            <Link to="#" className="text-neutral-400 text-base font-medium font-['Roboto'] hover:text-white transition-colors">Philippines</Link>
            <Link to="#" className="text-neutral-400 text-base font-medium font-['Roboto'] hover:text-white transition-colors">Hawaii, USA</Link>
          </div>

          {/* Column 3: Popular Hotel */}
          <div className="flex flex-col space-y-4">
            <h5 className="text-white text-xl font-semibold font-['Roboto'] mb-2">Popular Hotel</h5>
            <Link to="#" className="text-neutral-400 text-base font-medium font-['Roboto'] hover:text-white transition-colors">Marriott Hotels</Link>
            <Link to="#" className="text-neutral-400 text-base font-medium font-['Roboto'] hover:text-white transition-colors">Hyatt Hotels</Link>
            <Link to="#" className="text-neutral-400 text-base font-medium font-['Roboto'] hover:text-white transition-colors">Sheraton Hotels</Link>
            <Link to="#" className="text-neutral-400 text-base font-medium font-['Roboto'] hover:text-white transition-colors">Ritz-Carlton</Link>
            <Link to="#" className="text-neutral-400 text-base font-medium font-['Roboto'] hover:text-white transition-colors">Hilton Hotels</Link>
          </div>

          {/* Column 4: Resources */}
          <div className="flex flex-col space-y-4">
            <h5 className="text-white text-xl font-semibold font-['Roboto'] mb-2">Resources</h5>
            <Link to="/" className="text-neutral-400 text-base font-medium font-['Roboto'] hover:text-white transition-colors">Home</Link>
            <Link to="/hotel-listing" className="text-neutral-400 text-base font-medium font-['Roboto'] hover:text-white transition-colors">Hotel Listing</Link>
            <Link to="/taxi-listing" className="text-neutral-400 text-base font-medium font-['Roboto'] hover:text-white transition-colors">Taxi</Link>
            <Link to="/contact" className="text-neutral-400 text-base font-medium font-['Roboto'] hover:text-white transition-colors">Contact us</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center items-center text-sm font-medium font-['Poppins']">
            <span className="text-neutral-400">Copyright 2025 </span>
            <Link to="#" className="text-white mx-1 hover:text-neutral-300 transition-colors">Egens Lab</Link>
            <span className="text-neutral-400"> | All Right Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
