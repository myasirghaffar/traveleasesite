import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    StarRatingIcon,
    CheckCircleIcon,
    CalendarIcon,
    UserIcon,
    TrustedShieldIcon,
    ReliableSupportIcon,
    XIcon
} from '../../../../assets/icons/icons';
import { hotelsData } from '../../../../components/PopularHotels';

const HotelBookingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '2',
        paymentMethod: 'stripe',
        cardNumber: '',
        cardType: 'visa',
        cvc: '',
        expMonth: '',
        expYear: ''
    });

    // Find hotel by ID or use default if not found
    const hotel = hotelsData.find(h => h.id === parseInt(id)) || hotelsData[0];

    const breadcrumbItems = [
        { label: "Home", path: "/" },
        { label: "Rooms", path: "/hotel-listing" },
        { label: "Booking", path: "#", isActive: true },
    ];

    const handleNext = (e) => {
        e.preventDefault();
        if (step === 1) setStep(2);
        else {
            // Final submit logic here
            alert("Booking Confirmed!");
            navigate('/');
        }
    };

    const handleBack = () => {
        if (step === 2) setStep(1);
        else navigate(-1);
    };

    const renderStep1Header = () => (
        <div className="mb-10">
            <nav className="flex items-center gap-2 mb-4" aria-label="Breadcrumb">
                {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <span
                            className={`text-[14.5px] font-normal font-['Inter'] ${item.isActive ? "text-gray-900 font-semibold" : "text-gray-500 cursor-pointer hover:text-blue-500"}`}
                            onClick={() => !item.isActive && navigate(item.path)}
                        >
                            {item.label}
                        </span>
                        {index < breadcrumbItems.length - 1 && (
                            <span className="text-gray-400 text-xs">/</span>
                        )}
                    </React.Fragment>
                ))}
            </nav>
            <h1 className="text-gray-900 text-[37.4px] font-bold font-['Inter'] leading-[41.5px] mb-2 tracking-tight">
                Complete Your Booking
            </h1>
            <p className="text-gray-600 text-[16.6px] font-normal font-['Inter'] leading-[24.9px]">
                {step === 1 ? "Fill in your details to secure your reservation" : "Add your payment detail and pay now"}
            </p>
        </div>
    );

    return (
        <div className="min-h-screen pb-20 pt-12">
            <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
                {renderStep1Header()}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Main Form Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                            {step === 1 ? (
                                <form onSubmit={handleNext} className="space-y-8">
                                    <section>
                                        <h2 className="text-gray-900 text-xl font-bold font-['Inter'] mb-1">Guest Information</h2>
                                        <p className="text-gray-500 text-sm mb-6">Please provide your contact details</p>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-gray-700 text-xs font-bold font-['Inter'] uppercase tracking-wider mb-2">
                                                    Full Name <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative group">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                                        <UserIcon className="w-5 h-5" />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        placeholder="John Doe"
                                                        required
                                                        className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-['Inter']"
                                                        value={formData.fullName}
                                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-700 text-xs font-bold font-['Inter'] uppercase tracking-wider mb-2">
                                                        Email Address <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative group">
                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                                        </span>
                                                        <input
                                                            type="email"
                                                            placeholder="john@example.com"
                                                            required
                                                            className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-['Inter']"
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 text-xs font-bold font-['Inter'] uppercase tracking-wider mb-2">
                                                        Phone Number <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative group">
                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                                        </span>
                                                        <input
                                                            type="tel"
                                                            placeholder="+1 (555) 000-0000"
                                                            required
                                                            className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-['Inter']"
                                                            value={formData.phone}
                                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <hr className="border-gray-100" />

                                    <section>
                                        <h2 className="text-gray-900 text-xl font-bold font-['Inter'] mb-6">Booking Details</h2>
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-700 text-xs font-bold font-['Inter'] uppercase tracking-wider mb-2">
                                                        Check-in Date <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative group">
                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                                            <CalendarIcon className="w-5 h-5" />
                                                        </span>
                                                        <input
                                                            type="date"
                                                            required
                                                            className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-['Inter']"
                                                            value={formData.checkIn}
                                                            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 text-xs font-bold font-['Inter'] uppercase tracking-wider mb-2">
                                                        Check-out Date <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative group">
                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                                            <CalendarIcon className="w-5 h-5" />
                                                        </span>
                                                        <input
                                                            type="date"
                                                            required
                                                            className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-['Inter']"
                                                            value={formData.checkOut}
                                                            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-gray-700 text-xs font-bold font-['Inter'] uppercase tracking-wider mb-2">
                                                    Number of Guests <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative group">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                                    </span>
                                                    <select
                                                        className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-['Inter'] appearance-none"
                                                        value={formData.guests}
                                                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                                    >
                                                        <option value="1">1 Guest</option>
                                                        <option value="2">2 Guests</option>
                                                        <option value="3">3 Guests</option>
                                                        <option value="4">4 Guests</option>
                                                        <option value="5">5+ Guests</option>
                                                    </select>
                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <button type="submit" className="hidden">Submit Hidden</button>
                                </form>
                            ) : (
                                <div className="space-y-8">
                                    <section>
                                        <h2 className="text-gray-900 text-xl font-bold font-['Inter'] mb-1">Add Payment Method</h2>
                                        <p className="text-gray-500 text-sm mb-8">Please provide your payment details</p>

                                        <div className="mb-8">
                                            <label className="block text-gray-700 text-xs font-bold font-['Inter'] uppercase tracking-wider mb-4">
                                                Select Payment Method <span className="text-red-500">*</span>
                                            </label>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {['stripe', 'paypal', 'credit-card'].map((method) => (
                                                    <button
                                                        key={method}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, paymentMethod: method })}
                                                        className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all ${formData.paymentMethod === method ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-500/10' : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'}`}
                                                    >
                                                        {method === 'stripe' && <span className="text-3xl font-bold text-[#635BFF] font-['Inter']">stripe</span>}
                                                        {method === 'paypal' && (
                                                            <div className="flex flex-col items-center gap-1">
                                                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.028.15a.806.806 0 0 1-.795.68H8.334a.68.68 0 0 1-.672-.78l.001-.005.002-.01.63-3.993.04-.22a.805.805 0 0 1 .794-.68h.5c3.238 0 5.774-1.314 6.514-5.12.256-1.313.192-2.446-.3-3.327z" fill="#139AD6" />
                                                                    <path d="M18.76 8.05c-.152-.043-.307-.082-.465-.117a7.374 7.374 0 0 0-1.475-.142h-4.667a.805.805 0 0 0-.794.68l-.952 6.04-.028.177a.805.805 0 0 1 .794-.68h.5c3.238 0 5.774-1.314 6.514-5.12.256-1.313.192-2.446-.3-3.327a3.995 3.995 0 0 0-.127-.51z" fill="#263B80" />
                                                                </svg>
                                                                <span className="text-sm font-bold text-gray-900 mt-1">Paypal</span>
                                                            </div>
                                                        )}
                                                        {method === 'credit-card' && (
                                                            <div className="flex flex-col items-center gap-2">
                                                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                                                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                                                    <line x1="1" y1="10" x2="23" y2="10" />
                                                                </svg>
                                                                <span className="text-sm font-bold text-gray-900">Credit Card</span>
                                                            </div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-700 text-xs font-bold font-['Inter'] uppercase tracking-wider mb-2">
                                                        Card Number <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Card Number"
                                                        required
                                                        className="w-full bg-white border border-gray-200 rounded-xl py-4 px-4 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-['Inter']"
                                                        value={formData.cardNumber}
                                                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 text-xs font-bold font-['Inter'] uppercase tracking-wider mb-2">
                                                        Select Card <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative group">
                                                        <select
                                                            className="w-full bg-white border border-gray-200 rounded-xl py-4 px-4 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-['Inter'] appearance-none"
                                                            value={formData.cardType}
                                                            onChange={(e) => setFormData({ ...formData, cardType: e.target.value })}
                                                        >
                                                            <option value="visa">Visa</option>
                                                            <option value="mastercard">Mastercard</option>
                                                            <option value="amex">American Express</option>
                                                        </select>
                                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-gray-700 text-xs font-bold font-['Inter'] uppercase tracking-wider mb-2">CVC</label>
                                                    <input
                                                        type="text"
                                                        placeholder="CVC"
                                                        className="w-full bg-white border border-gray-200 rounded-xl py-4 px-4 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-['Inter']"
                                                        value={formData.cvc}
                                                        onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 text-xs font-bold font-['Inter'] uppercase tracking-wider mb-2">Expiration Month</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Month"
                                                        className="w-full bg-white border border-gray-200 rounded-xl py-4 px-4 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-['Inter']"
                                                        value={formData.expMonth}
                                                        onChange={(e) => setFormData({ ...formData, expMonth: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 text-xs font-bold font-['Inter'] uppercase tracking-wider mb-2">Expiration Year</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Year"
                                                        className="w-full bg-white border border-gray-200 rounded-xl py-4 px-4 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-['Inter']"
                                                        value={formData.expYear}
                                                        onChange={(e) => setFormData({ ...formData, expYear: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleNext}
                                                className="w-full md:w-auto bg-blue-500 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                                            >
                                                Pay Now
                                            </button>
                                        </div>
                                    </section>
                                </div>
                            )}
                        </div>

                        {/* Features Footer Area (Snippet 1 Style) */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 rounded-full">
                                    <TrustedShieldIcon className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="text-gray-900 text-sm font-bold">Secure Booking</h4>
                                    <p className="text-gray-500 text-xs">SSL encrypted transactions</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-50 rounded-full">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-gray-900 text-sm font-bold">Flexible Cancellation</h4>
                                    <p className="text-gray-500 text-xs">Free cancellation available</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-50 rounded-full">
                                    <ReliableSupportIcon className="w-6 h-6 text-purple-500" />
                                </div>
                                <div>
                                    <h4 className="text-gray-900 text-sm font-bold">24/7 Support</h4>
                                    <p className="text-gray-500 text-xs">Always here to help you</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 overflow-hidden">
                                <h3 className="text-gray-900 text-xl font-bold font-['Inter'] mb-6">Booking Summary</h3>

                                <div className="flex gap-4 mb-8">
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        className="w-20 h-20 rounded-xl object-cover shadow-sm"
                                    />
                                    <div>
                                        <h4 className="text-gray-900 font-bold font-['Inter'] leading-tight">{hotel.name}</h4>
                                        <div className="flex items-center gap-1 text-gray-500 mt-1">
                                            <StarRatingIcon className="w-3 h-3 text-yellow-500" />
                                            <span className="text-xs font-medium">4.8 • Luxury</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-500 mt-1">
                                            <CalendarIcon className="w-3.5 h-3.5" />
                                            <span className="text-xs font-normal">3 Nights</span>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-gray-50 mb-6" />

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-medium">Room Price</span>
                                        <span className="text-gray-900 font-bold">${hotel.price * 3}.00</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-medium">Taxes & Fees</span>
                                        <span className="text-gray-900 font-bold">$67.50</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-10">
                                    <span className="text-gray-900 text-lg font-bold">Total</span>
                                    <span className="text-blue-500 text-2xl font-extrabold">${(hotel.price * 3) + 67.5}.50</span>
                                </div>

                                {step === 1 && (
                                    <div className="space-y-4">
                                        <button
                                            onClick={handleNext}
                                            className="w-full bg-blue-500 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
                                        >
                                            <CheckCircleIcon className="w-5 h-5 text-white" />
                                            Confirm Booking
                                        </button>
                                        <button
                                            onClick={handleBack}
                                            className="w-full bg-white border border-gray-200 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                        >
                                            <XIcon className="w-4 h-4" />
                                            Cancel
                                        </button>
                                    </div>
                                )}

                                <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-xs">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                    <span className="font-semibold text-green-600/70">Secure Payment Processing</span>
                                </div>
                            </div>

                            {/* Info Card */}
                            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex gap-4">
                                <div className="bg-blue-500 rounded-full p-2 h-fit mt-1">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                                </div>
                                <div>
                                    <h5 className="text-blue-900 text-sm font-bold mb-1">Cancellation Policy</h5>
                                    <p className="text-blue-700/80 text-[11px] leading-relaxed">
                                        Free cancellation up to 48 hours before check-in. After that, a one-night fee applies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelBookingForm;
