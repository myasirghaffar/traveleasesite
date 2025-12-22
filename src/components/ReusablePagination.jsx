import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ReusablePagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10,
  showPageInfo = false,
  theme = "dark", // 'dark' or 'light'
}) => {
  const isLight = theme === "light";

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    rangeWithDots.push(1);

    // Calculate range around current page
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Add dots before range if there's a gap
    if (currentPage - delta > 2) {
      rangeWithDots.push("...");
    }

    // Add the range
    rangeWithDots.push(...range);

    // Add dots after range if there's a gap
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...");
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // Always render pagination, even with one page
  // Ensure we have valid values
  const safeCurrentPage = Math.max(1, currentPage);
  const safeTotalPages = Math.max(1, totalPages);

  const containerClass = isLight
    ? "flex items-center justify-center lg:justify-end gap-2"
    : "flex items-center justify-center p-3 lg:p-6 bg-[#171D41] rounded-lg";

  const buttonBaseClass = isLight
    ? "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium"
    : "bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white hover:shadow-lg hover:scale-105 active:scale-95";

  const activePageClass = isLight
    ? "bg-blue-600 border-blue-600 text-white"
    : "bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white shadow-lg";

  const inactivePageClass = isLight
    ? "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
    : "text-white hover:bg-[#2A2A3E] hover:text-white active:scale-95";

  const disabledClass = isLight
    ? "bg-gray-50 text-gray-300 cursor-not-allowed"
    : "bg-[#2A2A3E] text-[#AEB9E1] cursor-not-allowed opacity-50";

  return (
    <div className={isLight ? "w-full flex justify-end mt-4" : containerClass}>
      <div className={`flex flex-col lg:flex-row justify-between items-center ${isLight ? "gap-2" : "w-full gap-3 lg:gap-6"}`}>
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(safeCurrentPage - 1)}
          disabled={safeCurrentPage === 1}
          className={`flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 w-full lg:w-auto justify-center border ${safeCurrentPage === 1
              ? disabledClass
              : isLight ? "bg-white border-gray-200 text-gray-600 hover:bg-gray-50" : buttonBaseClass
            }`}
        >
          <ChevronLeft className="w-3 h-3 lg:w-4 lg:h-4" />
          {/* <span className="font-medium">Previous</span> */}
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 lg:gap-2 order-first lg:order-none">
          {getVisiblePages().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className={`px-2 lg:px-3 py-1 lg:py-2 font-medium text-sm lg:text-lg ${isLight ? "text-gray-400" : "text-[#AEB9E1]"}`}>
                  ...
                </span>
              ) : (
                <button
                  onClick={() => handlePageChange(page)}
                  className={`px-3 lg:px-4 py-1 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 min-w-[36px] lg:min-w-[40px] h-[36px] lg:h-[40px] flex items-center justify-center border ${safeCurrentPage === page
                      ? activePageClass
                      : inactivePageClass
                    }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(safeCurrentPage + 1)}
          disabled={safeCurrentPage === safeTotalPages}
          className={`flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 w-full lg:w-auto justify-center border ${safeCurrentPage === safeTotalPages
              ? disabledClass
              : isLight ? "bg-white border-gray-200 text-gray-600 hover:bg-gray-50" : buttonBaseClass
            }`}
        >
          {/* <span className="font-medium">Next</span> */}
          <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
        </button>
      </div>
    </div>
  );
};

export default ReusablePagination;
