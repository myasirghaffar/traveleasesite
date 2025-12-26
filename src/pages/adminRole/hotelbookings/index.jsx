import React, { useState, useMemo } from "react";
import {
  Download,
  ChevronLeft,
  ChevronRight,
  Filter,
  RotateCcw,
  X
} from "lucide-react";
import ReusableDataTable from "../../../components/ReusableDataTable";
import ReusablePagination from "../../../components/ReusablePagination";
import { useGetAdminBookingsQuery, useDeleteBookingMutation } from "../../../services/Api";
import { toast } from "react-toastify";

const HotelBookings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "",
    fromDate: "",
    toDate: "",
    payment: ""
  });
  
  const { data, isLoading, error, refetch } = useGetAdminBookingsQuery({
    page: currentPage,
    limit: 10,
    status: filters.status || undefined,
    startDate: filters.fromDate || undefined,
    endDate: filters.toDate || undefined,
  });
  const [deleteBooking] = useDeleteBookingMutation();

  // Transform API data to match component format
  const bookingsData = useMemo(() => {
    if (!data?.data?.bookings) return [];
    return data.data.bookings.map(booking => ({
      id: booking.id.toString(),
      userName: booking.user?.full_name || booking.user?.email || "Unknown User",
      userImage: booking.user?.profile_picture || booking.user?.avatar_url || `https://i.pravatar.cc/150?u=${booking.user_id}`,
      hotelName: booking.hotel?.name || "Unknown Hotel",
      checkIn: new Date(booking.check_in_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      checkOut: new Date(booking.check_out_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      totalPrice: parseFloat(booking.total_amount || 0),
      status: booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || "Pending",
      payment: booking.payment_status === 'paid' ? "Paid" : booking.payment_status === 'pending' ? "Pending" : "Refunded"
    }));
  }, [data]);

  // Custom Cell Renderers
  const customCellRenderers = {
    id: (row) => (
      <span className="text-slate-900 font-bold text-[14px] font-['Inter']">
        #{row.id}
      </span>
    ),
    userName: (row) => (
      <div className="flex items-center gap-3 py-2">
        <img
          src={row.userImage}
          alt={row.userName}
          className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
        />
        <span className="text-slate-700 font-bold text-[14px] font-['Inter']">
          {row.userName}
        </span>
      </div>
    ),
    hotelName: (row) => (
      <span className="text-slate-600 text-[14px] font-medium font-['Inter']">
        {row.hotelName}
      </span>
    ),
    dates: (row) => (
      <div className="flex flex-col text-[13px] text-slate-500 font-medium font-['Inter']">
        <span>{row.checkIn}</span>
        <span>{row.checkOut}</span>
      </div>
    ),
    totalPrice: (row) => (
      <span className="text-slate-900 font-black text-[15px] font-['Inter']">
        ${row.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
    ),
    status: (row) => (
      <span
        className={`px-3 py-1 rounded-full text-[12px] font-bold font-['Inter'] ${row.status === "Confirmed"
          ? "bg-green-50 text-green-500"
          : row.status === "Pending"
            ? "bg-yellow-50 text-yellow-500"
            : "bg-red-50 text-red-400"
          }`}
      >
        {row.status}
      </span>
    ),
    payment: (row) => (
      <span
        className={`px-3 py-1 rounded-full text-[12px] font-bold font-['Inter'] ${row.payment === "Paid"
          ? "bg-green-50 text-green-500"
          : row.payment === "Pending"
            ? "bg-yellow-50 text-yellow-500"
            : "bg-red-50 text-red-400"
          }`}
      >
        {row.payment}
      </span>
    ),
    actions: (row) => (
      <button 
        className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
        onClick={async () => {
          if (window.confirm(`Are you sure you want to delete booking #${row.id}?`)) {
            try {
              await deleteBooking(row.id).unwrap();
              toast.success('Booking deleted successfully');
              refetch();
            } catch (error) {
              toast.error(error?.data?.message || 'Failed to delete booking');
            }
          }
        }}
      >
        <X size={18} strokeWidth={2.5} />
      </button>
    ),
  };

  // Columns Configuration
  const columns = [
    { key: "id", label: "Booking ID", width: "110px" },
    { key: "userName", label: "User Name", width: "200px" },
    { key: "hotelName", label: "Hotel Name", width: "150px" },
    { key: "dates", label: "Check-in / Check-out", width: "180px" },
    { key: "totalPrice", label: "Total Price", width: "110px", center: true },
    { key: "status", label: "Status", width: "130px", center: true },
    { key: "payment", label: "Payment", width: "150px", center: true },
    { key: "actions", label: "Actions", width: "140px", center: true },
  ];



  const handleReset = () => {
    setFilters({
      status: "",
      fromDate: "",
      toDate: "",
      payment: ""
    });
  };

  return (
    <div className="w-full p-6 space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold font-['Inter']">
            Hotel Bookings
          </h1>
          <p className="text-gray-500 text-sm font-['Inter'] mt-1">
            Manage and track all hotel reservations.
          </p>
        </div>
      </div>

      {/* Filter Section Card */}
      <div className="bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full h-[50px] px-5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm focus:border-blue-500 outline-none transition-all"
            >
              <option value="">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">From Date</label>
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
              className="w-full h-[50px] px-5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">To Date</label>
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
              className="w-full h-[50px] px-5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Status</label>
            <select
              value={filters.payment}
              onChange={(e) => setFilters({ ...filters, payment: e.target.value })}
              className="w-full h-[50px] px-5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm focus:border-blue-500 outline-none transition-all"
            >
              <option value="">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t border-slate-50 pt-6">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-500 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95"
          >
            <RotateCcw size={16} />
            Reset Filters
          </button>
          <button className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
            <Filter size={16} />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-[24px] overflow-hidden border border-slate-200 shadow-sm">
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-white text-slate-900 font-bold text-lg">
          Booking Records
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95 group">
            <Download size={18} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
            Export Data
          </button>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Loading bookings...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-500">Error loading bookings. Please try again.</p>
          </div>
        ) : (
          <ReusableDataTable
            columns={columns}
            data={bookingsData}
            customCellRenderers={customCellRenderers}
          />
        )}
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <span className="text-slate-500 text-sm font-medium font-['Inter'] text-center sm:text-left">
          Showing {bookingsData.length > 0 ? (currentPage - 1) * 10 + 1 : 0} to {Math.min(currentPage * 10, bookingsData.length)} of {data?.data?.pagination?.total || bookingsData.length} results
        </span>
        <div className="w-auto">
          <ReusablePagination
            currentPage={currentPage}
            totalPages={data?.data?.pagination?.totalPages || Math.ceil(bookingsData.length / 10) || 1}
            onPageChange={setCurrentPage}
            theme="light"
          />
        </div>
      </div>
    </div>
  );
};

export default HotelBookings;
