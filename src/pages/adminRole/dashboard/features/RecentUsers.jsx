import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../../../services/ApiEndpoints';

const RecentUsers = ({ users = [], isLoading = false }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return diffMinutes <= 1 ? 'Just now' : `${diffMinutes} minutes ago`;
      }
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900 text-2xl md:text-4xl font-semibold leading-9">
            Recent Users
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

  if (!users || users.length === 0) {
    return (
      <div className="w-full bg-white rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900 text-2xl md:text-4xl font-semibold leading-9">
            Recent Users
          </h2>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No recent users found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900 text-2xl md:text-4xl font-semibold leading-9">
          Recent Users
        </h2>
        <button
          onClick={() => navigate('/admin/users')}
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          View All →
        </button>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => navigate(`/admin/users/${user.id}`)}
            className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
          >
            {/* User Avatar */}
            <div className="flex-shrink-0">
              {user.profile_picture ? (
                <img
                  src={getImageUrl(user.profile_picture)}
                  alt={user.full_name || user.email}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || user.email || 'U')}&background=4F46E5&color=fff`;
                  }}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold text-lg">
                    {(user.full_name || user.email || 'U').charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 font-semibold text-base truncate">
                    {user.full_name || 'No Name'}
                  </p>
                  <p className="text-gray-600 text-sm truncate">
                    {user.email}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Joined {formatDate(user.created_at)}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex-shrink-0">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(user.status)}`}
              >
                {user.status || 'Active'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUsers;

