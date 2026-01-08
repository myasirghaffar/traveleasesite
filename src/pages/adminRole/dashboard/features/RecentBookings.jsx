import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../../../services/ApiEndpoints';

const RecentBookings = ({ bookings = [], isLoading = false }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'checked_in':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900 text-2xl md:text-4xl font-semibold leading-9">
            Recent Bookings
          </h2>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-20 h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="w-full bg-white rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900 text-2xl md:text-4xl font-semibold leading-9">
            Recent Bookings
          </h2>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No recent bookings found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900 text-2xl md:text-4xl font-semibold leading-9">
          Recent Bookings
        </h2>
        <button
          onClick={() => navigate('/admin/bookings')}
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          View All →
        </button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            onClick={() => navigate(`/admin/bookings/${booking.id}`)}
            className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
          >
            {/* User Avatar */}
            <div className="flex-shrink-0">
              {booking.user?.profile_picture ? (
                <img
                  src={getImageUrl(booking.user.profile_picture)}
                  alt={booking.user.full_name || booking.user.email}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(booking.user?.full_name || booking.user?.email || 'U')}&background=4F46E5&color=fff`;
                  }}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold text-lg">
                    {(booking.user?.full_name || booking.user?.email || 'U').charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Booking Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 font-semibold text-base truncate">
                    {booking.user?.full_name || booking.user?.email || 'Unknown User'}
                  </p>
                  <p className="text-gray-600 text-sm truncate">
                    {booking.hotel?.name || 'Unknown Hotel'} • {booking.room?.name || 'Room N/A'}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {formatDate(booking.check_in_date)} - {formatDate(booking.check_out_date)}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-gray-900 font-bold text-lg">
                    {formatCurrency(booking.total_amount)}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Ref: {booking.booking_reference}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex-shrink-0">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(booking.status)}`}
              >
                {booking.status || 'N/A'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBookings;

