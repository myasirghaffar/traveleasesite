import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import mainLogo from "../../assets/logos/main_logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full flex flex-col items-center bg-white relative z-50 shadow-sm">
      {/* Background / Top Bar */}
      <div className="w-full h-12 bg-blue-500 overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto h-full px-4 lg:px-0 flex items-center justify-between lg:justify-center relative">

          {/* Mobile: Simple Text or partial slider (Simplified for Mobile) */}
          <div className="w-full h-full flex items-center justify-center relative">
            {/* Previous Slide Button (Hidden on small mobile if needed, or kept) */}
            <div className="hidden lg:flex size-6 rounded-xl outline outline-1 outline-offset-[-1px] outline-white cursor-pointer items-center justify-center absolute left-0 lg:left-[420px]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.77447 10.4081C9.03978 8.57139 5.36631 6.73465 3.16223 5.99996C5.36631 5.26527 8.67243 4.16323 9.77447 1.5918" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Carousel Item */}
            <div className="text-center whitespace-nowrap overflow-hidden text-ellipsis px-8">
              <span className="text-white text-xs sm:text-base font-medium font-display leading-6">Enjoy Family Holiday Packages with </span>
              <span className="text-white text-xs sm:text-base font-bold font-display leading-6 block sm:inline">Flexible Payment Options</span>
            </div>

            {/* Next Slide Button */}
            <div className="hidden lg:flex size-6 rounded-xl outline outline-1 outline-offset-[-1px] outline-white cursor-pointer items-center justify-center absolute right-0 lg:left-[995px]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.57129 10.4081C2.30598 8.57139 5.97945 6.73465 8.18354 5.99996C5.97945 5.26527 2.67333 4.16323 1.57129 1.5918" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar Container */}
      <div className="w-full max-w-[1440px] h-16 sm:h-20 lg:h-24 flex items-center justify-between px-4 lg:px-8 mt-2">
        {/* Logo */}
        <Link to="/" className="w-24 sm:w-28 lg:w-32 shrink-0 block">
          <img src={mainLogo} alt="Travel Ease Logo" className="w-full h-auto object-contain" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex gap-8 items-center">
          <Link to="/" className={`${isActive('/') ? 'text-blue-500' : 'text-stone-950'} text-base font-semibold font-poppins leading-4 tracking-wide whitespace-nowrap hover:text-blue-500 transition-colors`}>Home</Link>
          <Link to="/taxi-listing" className={`${isActive('/taxi-listing') ? 'text-blue-500' : 'text-stone-950'} text-base font-semibold font-poppins leading-4 tracking-wide whitespace-nowrap hover:text-blue-500 transition-colors`}>Taxi Booking</Link>
          <Link to="/hotel-listing" className={`${isActive('/hotel-listing') ? 'text-blue-500' : 'text-stone-950'} text-base font-semibold font-poppins leading-4 tracking-wide whitespace-nowrap hover:text-blue-500 transition-colors`}>Hotel Listing</Link>
          <Link to="/contact" className={`${isActive('/contact') ? 'text-blue-500' : 'text-stone-950'} text-base font-semibold font-poppins leading-4 tracking-wide whitespace-nowrap hover:text-blue-500 transition-colors`}>Contact</Link>
        </div>

        {/* Desktop Help Section & Button */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5644 11.7424L13.3315 9.50954C12.5341 8.7121 11.1784 9.03111 10.8594 10.0678C10.6202 10.7855 9.82272 11.1842 9.10502 11.0247C7.51013 10.626 5.35702 8.55261 4.9583 6.87797C4.71907 6.16024 5.19754 5.36279 5.91524 5.12359C6.95192 4.80461 7.27089 3.44895 6.47345 2.65151L4.2406 0.418659C3.60264 -0.139553 2.64571 -0.139553 2.0875 0.418659L0.572347 1.93381C-0.942799 3.5287 0.731836 7.75516 4.47983 11.5032C8.22783 15.2512 12.4543 17.0056 14.0492 15.4106L15.5644 13.8955C16.1226 13.2575 16.1226 12.3006 15.5644 11.7424Z" fill="#110F0F" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-600 text-xs font-semibold font-display">Need Help?</span>
              <span className="text-stone-950 text-sm font-semibold font-poppins font-bold">+91 345 533 865</span>
            </div>
          </div>

          <Link to="/booking" className="w-40 h-10 bg-blue-500 rounded-[10px] flex items-center justify-center hover:bg-blue-600 transition-colors">
            <span className="text-white text-base font-semibold font-poppins leading-4 tracking-wide">Book Now</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="lg:hidden flex items-center justify-center p-2 text-stone-950 focus:outline-none">
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col gap-4 border-t z-40">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className={`${isActive('/') ? 'text-blue-500' : 'text-stone-950'} text-lg font-semibold font-poppins py-2 border-b border-gray-100`}>Home</Link>
          <Link to="/taxi-listing" onClick={() => setIsMenuOpen(false)} className={`${isActive('/taxi-listing') ? 'text-blue-500' : 'text-stone-950'} text-lg font-semibold font-poppins py-2 border-b border-gray-100 hover:text-blue-500`}>Taxi Booking</Link>
          <Link to="/hotel-listing" onClick={() => setIsMenuOpen(false)} className={`${isActive('/hotel-listing') ? 'text-blue-500' : 'text-stone-950'} text-lg font-semibold font-poppins py-2 border-b border-gray-100 hover:text-blue-500`}>Hotel Listing</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className={`${isActive('/contact') ? 'text-blue-500' : 'text-stone-950'} text-lg font-semibold font-poppins py-2 border-b border-gray-100 hover:text-blue-500`}>Contact</Link>

          <div className="flex flex-col gap-2 mt-2">
            <span className="text-neutral-600 text-sm font-semibold font-display">Need Help?</span>
            <span className="text-stone-950 text-base font-bold font-poppins">+91 345 533 865</span>
          </div>

          <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="w-full h-12 bg-blue-500 rounded-[10px] flex items-center justify-center hover:bg-blue-600 transition-colors mt-2">
            <span className="text-white text-base font-semibold font-poppins">Book Now</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
