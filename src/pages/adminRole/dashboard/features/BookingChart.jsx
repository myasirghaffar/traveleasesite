import React, { useState } from 'react';

const BookingChart = () => {
    const [activeTab, setActiveTab] = useState('annually');

    // Data for different time periods
    const dailyData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        yAxisLabels: ['0', '50', '100', '150', '200', '250'],
        dataPoints: [
            { label: 'Mon', value: 120, percentage: 48 },
            { label: 'Tue', value: 180, percentage: 72 },
            { label: 'Wed', value: 150, percentage: 60 },
            { label: 'Thu', value: 200, percentage: 80 },
            { label: 'Fri', value: 220, percentage: 88 },
            { label: 'Sat', value: 190, percentage: 76 },
            { label: 'Sun', value: 160, percentage: 64 },
        ],
        selectedIndex: 4,
        stats: { percentage: '2.5%', comparison: 'VS YESTERDAY' }
    };

    const weeklyData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        yAxisLabels: ['0', '200', '400', '600', '800', '1k'],
        dataPoints: [
            { label: 'Week 1', value: 650, percentage: 65 },
            { label: 'Week 2', value: 820, percentage: 82 },
            { label: 'Week 3', value: 750, percentage: 75 },
            { label: 'Week 4', value: 900, percentage: 90 },
        ],
        selectedIndex: 2,
        stats: { percentage: '1.8%', comparison: 'VS LAST WEEK' }
    };

    const annuallyData = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        yAxisLabels: ['0', '1k', '2k', '3k', '4k', '5k'],
        dataPoints: [
            { label: 'JAN', value: 3348, percentage: 65 },
            { label: 'FEB', value: 2100, percentage: 42 },
            { label: 'MAR', value: 2800, percentage: 56 },
            { label: 'APR', value: 3100, percentage: 62 },
            { label: 'MAY', value: 2600, percentage: 52 },
            { label: 'JUN', value: 3900, percentage: 78 },
            { label: 'JUL', value: 4200, percentage: 84 },
            { label: 'AUG', value: 3700, percentage: 74 },
            { label: 'SEP', value: 3000, percentage: 60 },
            { label: 'OCT', value: 2400, percentage: 48 },
            { label: 'NOV', value: 2900, percentage: 58 },
            { label: 'DEC', value: 3500, percentage: 70 },
        ],
        selectedIndex: 5,
        stats: { percentage: '1.3%', comparison: 'VS LAST YEAR' }
    };

    // Get current data based on active tab
    const getCurrentData = () => {
        switch (activeTab) {
            case 'daily':
                return dailyData;
            case 'weekly':
                return weeklyData;
            case 'annually':
                return annuallyData;
            default:
                return annuallyData;
        }
    };

    const currentData = getCurrentData();
    const selectedPoint = currentData.dataPoints[currentData.selectedIndex];

    return (
        <div className="w-full h-[576px] relative bg-white rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <div className="text-zinc-400 text-base font-normal font-['Inter'] uppercase tracking-wide mb-2">
                        Revenue
                    </div>
                    <h2 className="text-slate-800 text-4xl font-bold font-['Inter'] leading-[51.49px]">
                        Booking Quick Summary
                    </h2>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 bg-slate-50 rounded-2xl p-1">
                    <button
                        onClick={() => setActiveTab('daily')}
                        className={`px-4 py-2 text-base font-normal font-['Inter'] rounded-xl transition-colors ${activeTab === 'daily'
                            ? 'bg-slate-800 text-white font-medium'
                            : 'text-zinc-400 hover:bg-white'
                            }`}
                    >
                        Daily
                    </button>
                    <button
                        onClick={() => setActiveTab('weekly')}
                        className={`px-4 py-2 text-base font-normal font-['Inter'] rounded-xl transition-colors ${activeTab === 'weekly'
                            ? 'bg-slate-800 text-white font-medium'
                            : 'text-zinc-400 hover:bg-white'
                            }`}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setActiveTab('annually')}
                        className={`px-4 py-2 text-base font-normal font-['Inter'] rounded-xl transition-colors ${activeTab === 'annually'
                            ? 'bg-slate-800 text-white font-medium'
                            : 'text-zinc-400 hover:bg-white'
                            }`}
                    >
                        Annually
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="text-green-600 text-base font-bold font-['Inter']">{currentData.stats.percentage}</span>
                </div>
                <span className="text-zinc-400 text-base font-normal font-['Inter'] uppercase tracking-wide">
                    {currentData.stats.comparison}
                </span>
            </div>

            {/* Chart Area */}
            <div className="relative h-[350px]">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-right pr-4">
                    {[...currentData.yAxisLabels].reverse().map((label, index) => (
                        <span key={index} className="text-gray-500 text-lg font-normal font-['Inter']">
                            {label}
                        </span>
                    ))}
                </div>

                {/* Grid lines */}
                <div className="absolute left-16 right-0 top-0 bottom-12 flex flex-col justify-between">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="w-full h-px bg-slate-200"></div>
                    ))}
                </div>

                {/* Chart SVG */}
                <svg className="absolute left-16 right-0 top-0 bottom-12 w-[calc(100%-4rem)] h-full" preserveAspectRatio="none">
                    {/* Gradient fill */}
                    <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#765DFF" stopOpacity="0.3" />
                            <stop offset="46%" stopColor="#CFCAFF" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Area fill */}
                    <path
                        d={`M 0 ${100 - currentData.dataPoints[0].percentage}% ${currentData.dataPoints.map((point, index) =>
                            `L ${(index / (currentData.dataPoints.length - 1)) * 100}% ${100 - point.percentage}%`
                        ).join(' ')} L 100% 100% L 0 100% Z`}
                        fill="url(#chartGradient)"
                    />

                    {/* Line */}
                    <path
                        d={`M 0 ${100 - currentData.dataPoints[0].percentage}% ${currentData.dataPoints.map((point, index) =>
                            `L ${(index / (currentData.dataPoints.length - 1)) * 100}% ${100 - point.percentage}%`
                        ).join(' ')}`}
                        fill="none"
                        stroke="#4A3AFF"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Data point indicator for selected month */}
                    <circle
                        cx={`${(currentData.selectedIndex / (currentData.dataPoints.length - 1)) * 100}%`}
                        cy={`${100 - selectedPoint.percentage}%`}
                        r="10"
                        fill="#4A3AFF"
                        stroke="white"
                        strokeWidth="3"
                    />
                </svg>

                {/* Tooltip */}
                <div
                    className="absolute bg-[#1E1B39] rounded-lg px-4 py-3 text-white"
                    style={{
                        left: `${(currentData.selectedIndex / (currentData.dataPoints.length - 1)) * 100}%`,
                        top: `${100 - selectedPoint.percentage - 20}%`,
                        transform: 'translate(-50%, -100%)'
                    }}
                >
                    <div className="text-slate-200 text-base font-normal font-['Inter'] mb-1">
                        {activeTab === 'daily' ? '1,348 bookings' : activeTab === 'weekly' ? '5,420 bookings' : '1,348 sales'}
                    </div>
                    <div className="text-white text-lg font-medium font-['Inter']">
                        ${selectedPoint.value.toLocaleString()}
                    </div>
                    {/* Arrow */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#1E1B39]"></div>
                    </div>
                </div>

                {/* X-axis labels */}
                <div className="absolute left-16 right-0 bottom-0 flex justify-between">
                    {currentData.labels.map((label, index) => (
                        <span key={index} className="text-gray-500 text-base font-normal font-['Inter'] uppercase tracking-wide">
                            {label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookingChart;
