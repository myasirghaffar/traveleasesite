import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    LocationIcon,
    CalendarIcon,
    TrustedShieldIcon,
    StarRatingIcon,
    CheckCircleIcon
} from '../../../../assets/icons/icons';
import { taxisData } from '../data/taxisData';

const TaxiBookingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find taxi by ID or use default if not found
    const taxi = taxisData.find(t => t.id === parseInt(id)) || taxisData[0];

    const [selectedVehicle, setSelectedVehicle] = useState('sedan');
    const [formData, setFormData] = useState({
        pickup: 'Jinnah International Airport, Karachi',
        dropoff: 'Clifton Beach, Karachi',
        date: '2025-03-12',
        time: '15:45'
    });

    const vehicleTypes = [
        { id: 'sedan', name: 'Sedan', description: 'Toyota Corolla (AC)', price: 1250 },
        { id: 'suv', name: 'SUV', description: 'Toyota Fortuner', price: 2450 },
        { id: 'business', name: 'Business', description: 'Honda Civic Oriel', price: 1850 },
        { id: 'mini', name: 'Mini', description: 'Suzuki WagonR', price: 950 }
    ];

    const handleBooking = (e) => {
        e.preventDefault();
        alert(`Booking Confirmed for ${taxi.name} (${selectedVehicle})!`);
        navigate('/taxi-listing');
    };

    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-4 lg:px-8 font-['Inter']">
            <div className="max-w-[1232px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* Left Side: Booking Form */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
                    <div className="mb-10 text-center">
                        <h1 className="text-[#111827] text-3xl font-bold mb-2">Book a Taxi for Your Trip</h1>
                        <p className="text-gray-500 text-base">Quick and reliable transportation at your fingertips</p>
                    </div>

                    <form onSubmit={handleBooking} className="space-y-6">
                        {/* Locations */}
                        <div className="space-y-6">
                            <div className="relative group">
                                <label className="flex items-center gap-2 text-[#111827] text-sm font-semibold mb-2">
                                    <div className="w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                    </div>
                                    Pickup Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.pickup}
                                    onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                                    className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                                />
                            </div>

                            <div className="relative group">
                                <label className="flex items-center gap-2 text-[#111827] text-sm font-semibold mb-2">
                                    <div className="w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                    </div>
                                    Drop-off Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.dropoff}
                                    onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })}
                                    className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Date and Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center gap-2 text-[#111827] text-sm font-semibold mb-2">
                                    <CalendarIcon className="w-4 h-4 text-blue-500" />
                                    Pick-up Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-black outline-none"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-[#111827] text-sm font-semibold mb-2">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-500" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                    Pick-up Time
                                </label>
                                <input
                                    type="time"
                                    value={formData.time}
                                    className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-black outline-none"
                                />
                            </div>
                        </div>

                        {/* Vehicle Type Selection */}
                        <div>
                            <label className="flex items-center gap-2 text-[#111827] text-sm font-semibold mb-4">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="2">
                                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                                    <circle cx="7" cy="17" r="2" />
                                    <path d="M9 17h6" />
                                    <circle cx="17" cy="17" r="2" />
                                </svg>
                                Vehicle Type
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                {vehicleTypes.map((type) => (
                                    <div
                                        key={type.id}
                                        onClick={() => setSelectedVehicle(type.id)}
                                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center ${selectedVehicle === type.id
                                            ? 'border-blue-500 bg-blue-50/50'
                                            : 'border-gray-100 hover:border-gray-200'
                                            }`}
                                    >
                                        <h4 className="text-[#111827] text-base font-bold">{type.name}</h4>
                                        <p className="text-gray-500 text-xs mt-1">{type.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Estimated Fare Box */}
                        <div className="bg-gray-50 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between border border-gray-100">
                            <span className="text-[#111827] text-base font-semibold">Estimated Fare:</span>
                            <span className="text-[#1781FE] text-2xl font-bold">
                                PKR {vehicleTypes.find(v => v.id === selectedVehicle).price} – {vehicleTypes.find(v => v.id === selectedVehicle).price + 200}
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#1781FE] text-white h-14 rounded-xl text-lg font-bold flex items-center justify-center gap-3 hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                            </svg>
                            Book Taxi
                        </button>

                        <p className="text-center text-gray-500 text-sm mt-4">
                            Reliable drivers, clean cars, and on-time arrival — every time.
                        </p>
                    </form>
                </div>

                {/* Right Side: Trip Summary & Why Choose */}
                <div className="space-y-8">
                    {/* Trip Summary Card */}
                    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                        {/* Map Image Placeholder */}
                        <div className="h-64 bg-blue-50 relative">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
                                alt="Map Area"
                                className="w-full h-full object-cover opacity-60 grayscale-[0.5]"
                            />
                            <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-md">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-xs font-bold text-black">Pickup</span>
                            </div>
                            <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-md">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-xs font-bold text-black">Drop-off</span>
                            </div>
                        </div>

                        <div className="p-8">
                            <h3 className="text-[#111827] text-xl font-bold mb-6">Trip Details</h3>
                            <div className="space-y-8 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-gray-200"></div>

                                {/* Pickup */}
                                <div className="flex gap-4 relative">
                                    <div className="w-3 h-3 bg-green-500 rounded-full ring-4 ring-green-100 shrink-0 mt-1.5 z-10"></div>
                                    <div>
                                        <p className="text-[#111827] text-base font-bold">{formData.pickup.split(',')[0]}</p>
                                        <p className="text-gray-500 text-sm">{formData.pickup.split(',')[1] || 'Karachi'}</p>
                                    </div>
                                </div>

                                {/* Duration Overlay */}
                                <div className="pl-7 py-1">
                                    <span className="bg-gray-50 px-3 py-1 rounded-full text-xs font-medium text-gray-500 border border-gray-100">
                                        22-28 minutes drive
                                    </span>
                                </div>

                                {/* Drop-off */}
                                <div className="flex gap-4 relative">
                                    <div className="w-3 h-3 bg-red-500 rounded-full ring-4 ring-red-100 shrink-0 mt-1.5 z-10"></div>
                                    <div>
                                        <p className="text-[#111827] text-base font-bold">{formData.dropoff.split(',')[0]}</p>
                                        <p className="text-gray-500 text-sm">{formData.dropoff.split(',')[1] || 'Karachi'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Why Choose Section */}
                    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
                        <h3 className="text-[#111827] text-xl font-bold mb-6">Why Choose TaxiGo?</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                                    <TrustedShieldIcon className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-[#111827] text-base font-bold">Safe & Secure</p>
                                    <p className="text-gray-500 text-sm">Verified drivers and GPS tracking</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-600" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[#111827] text-base font-bold">On-Time Arrival</p>
                                    <p className="text-gray-500 text-sm">Punctual service guaranteed</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-600" strokeWidth="2">
                                        <rect x="2" y="5" width="20" height="14" rx="2" />
                                        <line x1="2" y1="10" x2="22" y2="10" />
                                    </svg>
                                </div>
                                {renderPaymentDetails()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function renderPaymentDetails() {
        return <div>
            <p className="text-[#111827] text-base font-bold">Easy Payment</p>
            <p className="text-gray-500 text-sm">Cash, card, or digital wallet</p>
        </div>;
    }
};

export default TaxiBookingForm;

