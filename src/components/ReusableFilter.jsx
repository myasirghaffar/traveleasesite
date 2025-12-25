import React, { useState, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";

/**
 * ReusableFilter - Multi-purpose filter bar
 * Matches the UI in uploaded_image_1 (Search by name + Location + Price Range)
 */
const ReusableFilter = ({
  // Search configuration
  searchPlaceholder = "Search by Name...",
  onSearchChange,

  // Filter dropdowns configuration
  // [{ key: 'location', label: 'Location', options: [{ value: 'nz', label: 'New Zealand' }] }]
  filters = [],
  onFilterChange,

  // Initial values
  initialSearch = "",
  initialFilters = {},

  className = "",
}) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  // Toggle dynamic dropdowns
  const toggleDropdown = (filterKey) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  // Close other dropdowns when one opens
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (!e.target.closest(".reusable-filter-dropdown")) {
        setOpenDropdowns({});
      }
    };
    document.addEventListener("mousedown", handleGlobalClick);
    return () => document.removeEventListener("mousedown", handleGlobalClick);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const handleFilterSelect = (key, value) => {
    const newFilters = { ...selectedFilters, [key]: value };
    setSelectedFilters(newFilters);
    onFilterChange?.(key, value);
    setOpenDropdowns((prev) => ({ ...prev, [key]: false }));
  };

  const isTransparent = className.includes("bg-transparent");

  return (
    <div className={`w-full ${isTransparent ? "" : "bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)]"} rounded-[20px] p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 ${className}`}>
      {/* Search Input Group */}
      <div className="relative flex-1 w-full">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={handleSearchChange}
          className={`w-full pl-12 pr-10 py-3 ${isTransparent ? "bg-transparent" : "bg-white"} border border-slate-300 rounded-xl text-sm font-['Inter'] outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 placeholder:text-slate-400 h-[50px]`}
        />

        {searchTerm && (
          <button
            onClick={() => { setSearchTerm(""); onSearchChange?.(""); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Dynamic Dropdowns */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        {filters.map((filter) => (
          <div key={filter.key} className="relative reusable-filter-dropdown flex-1 md:flex-none min-w-[160px]">
            <button
              onClick={() => toggleDropdown(filter.key)}
              className={`w-full h-[50px] flex items-center justify-between px-5 py-3 ${isTransparent ? "bg-transparent" : "bg-white"} border border-slate-300 rounded-xl text-sm font-bold font-['Inter'] transition-all hover:border-blue-500 ${selectedFilters[filter.key] ? 'border-blue-500 text-blue-600' : 'text-slate-700'
                }`}
            >

              <span className="truncate">
                {filter.options?.find(opt => opt.value === selectedFilters[filter.key])?.label || filter.label}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openDropdowns[filter.key] ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {openDropdowns[filter.key] && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-[15px] shadow-xl z-[100] py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                {filter.options?.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleFilterSelect(filter.key, opt.value)}
                    className="w-full text-left px-4 py-2.5 text-sm font-poppins hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReusableFilter;
