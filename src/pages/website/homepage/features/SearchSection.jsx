import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableInput from '../../../../components/ReusableInput';
import { CalendarIcon, UserIcon, HotelIcon, FlightIcon, TaxiIcon } from '../../../../assets/icons/icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDateInput = React.forwardRef(({ value, onClick, label }, ref) => (
    <div onClick={onClick} className="cursor-pointer w-full">
        <ReusableInput
            label={label}
            value={value}
            ref={ref}
            placeholder="mm/dd/yyyy"
            iconRight={<CalendarIcon className="w-6 h-6 stroke-black" />}
            labelClassName="text-blue-500 text-sm font-medium font-['Inter']"
            border="border-gray-200"
            classes="h-[3.18rem] text-base cursor-pointer pr-12 !text-stone-950"
            containerClasses="w-full"
            readOnly
        />
    </div>
));

const SearchSection = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('hotels');
    const [destination, setDestination] = useState('');
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [guests, setGuests] = useState('1 Guest');

    const tabs = [
        { id: 'hotels', label: 'Hotels', icon: <HotelIcon className={activeTab === 'hotels' ? "fill-[#AD932C]" : "fill-[#1781FE]"} />, buttonText: 'Search Hotels', path: '/hotel-listing' },
        { id: 'flights', label: 'Flights', icon: <FlightIcon className={activeTab === 'flights' ? "fill-[#AD932C]" : "fill-[#1781FE]"} />, buttonText: 'Search Flights', path: '#' },
        { id: 'taxi', label: 'Taxi', icon: <TaxiIcon className={activeTab === 'taxi' ? "fill-[#AD932C]" : "fill-[#1781FE]"} />, buttonText: 'Search Taxi', path: '/taxi-listing' },
    ];

    const activeTabData = tabs.find(tab => tab.id === activeTab);

    const handleSearch = () => {
        if (activeTabData?.path && activeTabData.path !== '#') {
            navigate(activeTabData.path);
        } else if (activeTabData?.id === 'flights') {
            alert("Flight search is coming soon!");
        }
    };

    return (
        <div className="relative w-full max-w-[1024px] mx-auto bg-white rounded-[30px] shadow-[0px_35px_70px_0px_rgba(0,0,0,0.15)] border border-gray-100 p-8 pt-10">

            {/* Tabs */}
            <div className="absolute -top-6 left-8 flex space-x-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${activeTab === tab.id
                            ? 'bg-white border-gray-200 shadow-sm'
                            : 'bg-white border-gray-200/50 hover:bg-gray-50'
                            }`}
                    >
                        <span className="w-5 h-5 flex items-center justify-center">{tab.icon}</span>
                        <span className={`font-['Poppins'] font-semibold leading-4 ${activeTab === tab.id ? 'text-stone-950' : 'text-gray-500'
                            }`}>
                            {tab.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <ReusableInput
                    label="Destination"
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    labelClassName="text-blue-500 text-sm font-medium font-['Inter']"
                    border="border-gray-200"
                    classes="h-[3.18rem] text-base !text-stone-950"
                    containerClasses="w-full"
                />

                <div className="relative w-full">
                    <DatePicker
                        selected={checkInDate}
                        onChange={(date) => setCheckInDate(date)}
                        dateFormat="MM/dd/yyyy"
                        wrapperClassName="w-full"
                        customInput={<CustomDateInput label="Check-in" />}
                        popperPlacement="bottom-start"
                        popperModifiers={[
                            {
                                name: "offset",
                                options: {
                                    offset: [0, 10],
                                },
                            },
                        ]}
                    />
                </div>

                <div className="relative w-full">
                    <DatePicker
                        selected={checkOutDate}
                        onChange={(date) => setCheckOutDate(date)}
                        dateFormat="MM/dd/yyyy"
                        minDate={checkInDate}
                        wrapperClassName="w-full"
                        customInput={<CustomDateInput label="Check-out" />}
                        popperPlacement="bottom-start"
                        popperModifiers={[
                            {
                                name: "offset",
                                options: {
                                    offset: [0, 10],
                                },
                            },
                        ]}
                    />
                </div>

                <ReusableInput
                    as="select"
                    label="Guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    iconRight={<div className="pointer-events-none"><UserIcon className="w-6 h-6 fill-black" /></div>}
                    labelClassName="text-blue-500 text-sm font-medium font-['Inter']"
                    border="border-gray-200"
                    classes="h-[3.18rem] text-base appearance-none cursor-pointer pr-12 !text-stone-950"
                    containerClasses="w-full"
                >
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                </ReusableInput>
            </div>

            {/* Search Button */}
            <button
                onClick={handleSearch}
                className="w-full bg-blue-500 rounded-lg h-14 text-white text-lg font-semibold font-['Inter'] hover:bg-blue-600 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20"
            >
                {activeTabData?.buttonText || 'Search'}
            </button>
        </div>
    );
};

export default SearchSection;
