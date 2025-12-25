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
    ? "flex items-center justify-between gap-4 flex-wrap"
    : "flex items-center justify-center p-3 lg:p-6 bg-[#171D41] rounded-lg";

  const buttonBaseClass = isLight
    ? "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 text-sm font-medium"
    : "bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white hover:shadow-lg hover:scale-105 active:scale-95";

  const activePageClass = isLight
    ? "bg-blue-600 border-blue-600 text-white"
    : "bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white shadow-lg";

  const inactivePageClass = isLight
    ? "bg-white border-slate-300 text-slate-600 hover:bg-slate-50"
    : "text-white hover:bg-[#2A2A3E] hover:text-white active:scale-95";

  const disabledClass = isLight
    ? "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
    : "bg-[#2A2A3E] text-[#AEB9E1] cursor-not-allowed opacity-50";

  return (
    <div className={`flex items-center gap-2 ${isLight ? "" : containerClass}`}>
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(safeCurrentPage - 1)}
        disabled={safeCurrentPage === 1}
        className={`flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-xl border transition-all duration-200 ${safeCurrentPage === 1
          ? disabledClass
          : isLight ? buttonBaseClass : buttonBaseClass
          }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {getVisiblePages().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className={`px-1.5 py-2 font-medium text-sm ${isLight ? "text-slate-400" : "text-[#AEB9E1]"}`}>
                ...
              </span>
            ) : (
              <button
                onClick={() => handlePageChange(page)}
                className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center border ${safeCurrentPage === page
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
        className={`flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-xl border transition-all duration-200 ${safeCurrentPage === safeTotalPages
          ? disabledClass
          : isLight ? buttonBaseClass : buttonBaseClass
          }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ReusablePagination;
