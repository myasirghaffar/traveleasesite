import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StarRatingIcon } from '../../../../assets/icons/icons';

const TaxiCard = ({ taxi }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-[34px] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300">
            {/* Header: Name and Type */}
            <div className="mb-4">
                <h3 className="text-[#1E293B] text-xl font-bold font-['Poppins'] leading-tight mb-0.5">
                    {taxi.name}
                </h3>
                <p className="text-gray-400 text-sm font-medium font-['Inter']">
                    {taxi.type}
                </p>
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-[16/10] mb-5 overflow-hidden rounded-xl">
                <img
                    src={taxi.image}
                    alt={taxi.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Driver and Price Information */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    {/* Driver Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
                        <img
                            src={taxi.driverImage}
                            alt={taxi.driverName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Driver Info */}
                    <div className="flex flex-col">
                        <span className="text-[#1E293B] text-sm font-semibold font-['Inter']">
                            {taxi.driverName}
                        </span>
                        <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                            <StarRatingIcon className="w-3.5 h-3.5 text-[#3B82F6] fill-current" />
                            <span className="text-[#1E293B]">{taxi.rating}</span>
                            <span>({taxi.ridesCompleted} rides)</span>
                        </div>
                    </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                    <span className="text-gray-400 text-xs font-medium">$ From</span>
                    <span className="text-[#1E293B] text-lg font-bold font-['Poppins']">
                        ${Math.floor(taxi.price)}
                    </span>
                </div>
            </div>

            {/* Book Now Button */}
            <button
                onClick={() => navigate(`/taxi-booking/${taxi.id}`)}
                className="w-full bg-[#1781FE] text-white py-3.5 rounded-xl text-sm font-bold font-['Inter'] hover:bg-blue-600 transition-all active:scale-[0.98] shadow-sm"
            >
                Book Now
            </button>
        </div>
    );
};

export default TaxiCard;
