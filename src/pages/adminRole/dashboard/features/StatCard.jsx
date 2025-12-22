import React from 'react';

const StatCard = ({ icon: Icon, title, value, bgColor, iconColor, badge }) => {
    return (
        <div className="w-full max-w-[256px] h-44 relative bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200">
            <div className="h-12 absolute left-[25px] top-[25px]">
                <div className={`size-12 ${bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
            </div>

            {badge && (
                <span className={`absolute right-4 top-4 px-2 py-1 ${badge.bgColor} rounded-sm`}>
                    <span className={`text-xs font-semibold font-['Inter'] ${badge.textColor}`}>
                        {badge.text}
                    </span>
                </span>
            )}

            <h3 className="absolute left-[25px] right-[25px] top-[89px] text-gray-600 text-sm font-medium font-['Inter']">
                {title}
            </h3>

            <p className="absolute left-[25px] top-[113px] text-gray-900 text-3xl font-bold font-['Inter']">
                {value}
            </p>
        </div>
    );
};

export default StatCard;
