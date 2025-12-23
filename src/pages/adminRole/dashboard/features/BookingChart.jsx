import React, { useState, useEffect } from 'react';


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
    const [hoveredIndex, setHoveredIndex] = useState(currentData.selectedIndex);

    // Update hovered index when active tab changes
    useEffect(() => {
        setHoveredIndex(currentData.selectedIndex);
    }, [activeTab, currentData.selectedIndex]);

    // Safety check: if hoveredIndex is out of bounds for currentData (usually happens during tab transition),
    // fallback to the current data's default selected index.
    const safeHoveredIndex = hoveredIndex < currentData.dataPoints.length ? hoveredIndex : currentData.selectedIndex;
    const selectedPoint = currentData.dataPoints[safeHoveredIndex];

    // Helper to generate smooth cubic Bezier path
    const getBezierPath = (points, isArea = false) => {
        if (points.length < 2) return "";

        const getPoint = (i) => ({
            x: (i / (points.length - 1)) * 100,
            y: 100 - points[i].percentage
        });

        let d = `M ${getPoint(0).x} ${getPoint(0).y}`;

        for (let i = 0; i < points.length - 1; i++) {
            const curr = getPoint(i);
            const next = getPoint(i + 1);

            // Tension for the curve (0.2 - 0.4 usually looks good)
            const tension = 0.2;
            const cp1x = curr.x + (next.x - curr.x) * tension;
            const cp2x = next.x - (next.x - curr.x) * tension;

            d += ` C ${cp1x} ${curr.y}, ${cp2x} ${next.y}, ${next.x} ${next.y}`;
        }

        if (isArea) {
            d += ` L 100 100 L 0 100 Z`;
        }

        return d;
    };

    return (
        <div className="w-full h-auto md:h-[576px] relative bg-white rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                <div>
                    <div className="text-zinc-400 text-sm md:text-base font-normal font-['Inter'] uppercase tracking-wide mb-1 md:mb-2">
                        Revenue
                    </div>
                    <h2 className="text-slate-800 text-2xl md:text-4xl font-bold font-['Inter'] leading-tight md:leading-[51.49px]">
                        Booking Quick Summary
                    </h2>
                </div>

                {/* Period Selector - Desktop Tabs */}
                <div className="hidden md:flex gap-2 bg-slate-50 rounded-2xl p-1">
                    {['daily', 'weekly', 'annually'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-base font-normal font-['Inter'] rounded-xl transition-colors capitalize ${activeTab === tab
                                ? 'bg-slate-800 text-white font-medium'
                                : 'text-zinc-400 hover:bg-white'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Period Selector - Mobile Dropdown */}
                <div className="md:hidden w-full relative">
                    <select
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}
                        className="w-full appearance-none bg-slate-50 text-slate-800 text-base font-medium font-['Inter'] px-4 py-3 pr-10 rounded-xl border border-slate-100 outline-none focus:ring-2 focus:ring-slate-200 transition-all cursor-pointer"
                    >
                        <option value="daily">Daily View</option>
                        <option value="weekly">Weekly View</option>
                        <option value="annually">Annually View</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
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
                <div className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-right pr-3 md:pr-4">
                    {[...currentData.yAxisLabels].reverse().map((label, index) => (
                        <span key={index} className="text-gray-400 md:text-gray-500 text-sm md:text-lg font-normal font-['Inter']">
                            {label}
                        </span>
                    ))}
                </div>

                {/* Grid lines */}
                <div className="absolute left-16 right-0 top-0 bottom-12 flex flex-col justify-between pointer-events-none">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="w-full h-px bg-slate-200"></div>
                    ))}
                </div>

                {/* Chart Drawing Area */}
                <div className="absolute left-16 right-0 top-0 bottom-12">
                    {/* Chart SVG */}
                    <svg
                        className="w-full h-full cursor-crosshair overflow-visible"
                        preserveAspectRatio="none"
                        viewBox="0 0 100 100"
                        onMouseLeave={() => setHoveredIndex(currentData.selectedIndex)}
                    >
                        <defs>
                            <linearGradient id="paint0_linear_157_447" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop stopColor="#765DFF" />
                                <stop offset="0.46679" stopColor="#CFCAFF" />
                                <stop offset="1" stopColor="white" />
                            </linearGradient>
                        </defs>

                        {/* Area fill with smooth curves */}
                        <g style={{ mixBlendMode: 'multiply' }} opacity="0.33">
                            <path
                                d={getBezierPath(currentData.dataPoints, true)}
                                fill="url(#paint0_linear_157_447)"
                            />
                        </g>

                        {/* Main Chart Line with smooth curves */}
                        <path
                            d={getBezierPath(currentData.dataPoints, false)}
                            fill="none"
                            stroke="#4A3AFF"
                            strokeWidth="3.21839"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                        />

                        {/* Vertical Indicator Line */}
                        <line
                            x1={(safeHoveredIndex / (currentData.dataPoints.length - 1)) * 100}
                            y1={100 - selectedPoint.percentage}
                            x2={(safeHoveredIndex / (currentData.dataPoints.length - 1)) * 100}
                            y2="100"
                            stroke="#4A3AFF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray="4 4"
                            opacity="0.5"
                            vectorEffect="non-scaling-stroke"
                        />

                        {/* Interactive hover zones */}
                        {currentData.dataPoints.map((_, idx) => (
                            <rect
                                key={idx}
                                x={(idx / (currentData.dataPoints.length - 1)) * 100 - (100 / (currentData.dataPoints.length * 2))}
                                y="0"
                                width={100 / (currentData.dataPoints.length - 1)}
                                height="100"
                                fill="transparent"
                                onMouseMove={() => setHoveredIndex(idx)}
                                className="outline-none"
                            />
                        ))}
                    </svg>

                    {/* Round Indicator Point (Outside SVG to prevent stretching) */}
                    <div
                        className="absolute w-3.5 h-3.5 rounded-full border-[2.5px] border-white bg-[#4A3AFF] shadow-[0_4px_8px_rgba(74,58,255,0.4)] z-20 pointer-events-none transition-all duration-200"
                        style={{
                            left: `${(safeHoveredIndex / (currentData.dataPoints.length - 1)) * 100}%`,
                            top: `${100 - selectedPoint.percentage}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />

                    {/* Tooltip */}
                    <div
                        className="absolute bg-[#1E1B39] rounded-lg px-4 py-3 text-white transition-all duration-200 pointer-events-none z-30"
                        style={{
                            left: `${(safeHoveredIndex / (currentData.dataPoints.length - 1)) * 100}%`,
                            top: `${100 - selectedPoint.percentage}%`,
                            transform: 'translate(-50%, calc(-100% - 15px))'
                        }}
                    >
                        <div className="text-slate-200 text-[13px] font-normal font-['Inter'] mb-1 whitespace-nowrap">
                            {activeTab === 'annually' ? `${selectedPoint.value} sales` : `${selectedPoint.value} bookings`}
                        </div>
                        <div className="text-white text-base font-bold font-['Inter'] whitespace-nowrap">
                            {selectedPoint.label} Summary
                        </div>
                        {/* Tooltip Arrow */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#1E1B39]"></div>
                        </div>
                    </div>
                </div>


                {/* X-axis labels */}
                <div className="absolute left-16 right-0 bottom-0 h-6">
                    {currentData.labels.map((label, index) => (
                        <span
                            key={index}
                            className={`absolute text-gray-400 md:text-gray-500 text-[10px] md:text-base font-normal font-['Inter'] uppercase tracking-wide transform -translate-x-1/2 whitespace-nowrap ${activeTab === 'annually' && index % 2 !== 0 ? 'hidden md:block' : ''
                                }`}
                            style={{ left: `${(index / (currentData.labels.length - 1)) * 100}%` }}
                        >
                            {label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookingChart;
