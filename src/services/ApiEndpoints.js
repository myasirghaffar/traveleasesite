// Normalize BASE_URL to ensure it has a protocol
const getBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  // If URL doesn't start with http:// or https://, add http://
  if (url && !url.match(/^https?:\/\//i)) {
    return `http://${url}`;
  }
  return url;
};

export const BASE_URL = getBaseUrl();
// export const BASE_URL = 'https://b0fd-139-135-36-92.ngrok-free.app'
const getBaseUrlImage = () => {
  const url = import.meta.env.VITE_BASE_URL_IMAGE || import.meta.env.VITE_API_URL || 'http://localhost:4000';
  // If URL doesn't start with http:// or https://, add http://
  if (url && !url.match(/^https?:\/\//i)) {
    return `http://${url}`;
  }
  return url;
};

export const BASE_URL_IMAGE = getBaseUrlImage();

/**
 * Constructs a full image URL from a relative path
 * @param {string} imagePath - Relative image path (e.g., '/uploads/hotels/1/cover.jpg')
 * @returns {string} Full image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If already a full URL (http/https), return as is
  if (imagePath.match(/^https?:\/\//i)) {
    return imagePath;
  }
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Construct full URL
  const baseUrl = BASE_URL_IMAGE.endsWith('/') ? BASE_URL_IMAGE.slice(0, -1) : BASE_URL_IMAGE;
  return `${baseUrl}/${cleanPath}`;
};
const VERSION_API = "v1";

export const API_END_POINTS = {
  /////////////////////////////<=== AUTH ===>//////////////////////////////
  register: "/api/auth/register",
  login: "/api/auth/login",
  forgetPassword: "/api/auth/forgot-password",
  resetPassword: "/api/auth/reset-password",
  getUserProfile: "/api/auth/profile",
  updateUserProfile: "/api/auth/profile",
  editUser: "/api/auth/editUser",

  /////////////////////////////<=== WEBSITE HOTELS ===>//////////////////////
  getHotels: "/api/hotels",
  getHotelById: (id) => `/api/hotels/${id}`,
  checkRoomAvailability: (hotelId, roomId) => `/api/hotels/${hotelId}/rooms/${roomId}/availability`,

  /////////////////////////////<=== WEBSITE BOOKINGS ===>/////////////////////
  createBooking: "/api/bookings",

  /////////////////////////////<=== WEBSITE TAXIS ===>////////////////////////
  getTaxis: "/api/taxis",
  getTaxiById: (id) => `/api/taxis/${id}`,
  checkTaxiAvailability: (taxiId) => `/api/taxis/${taxiId}/availability`,

  /////////////////////////////<=== WEBSITE TAXI BOOKINGS ===>////////////////
  calculateFare: "/api/taxi-booking/calculate",
  createTaxiBooking: "/api/taxi-booking",

  /////////////////////////////<=== ADMIN DASHBOARD ===>/////////////////////
  getAdminDashboardStats: "/api/admin/dashboard/stats",
  getAdminDashboardOverview: "/api/admin/dashboard",
  getAdminRevenueData: "/api/admin/dashboard/revenue",
  getAdminUnreadNotificationsCount: "/api/admin/dashboard/notifications/unread-count",

  /////////////////////////////<=== ADMIN USERS ===>//////////////////////////
  getUsers: "/api/admin/users",
  getUserById: (id) => `/api/admin/users/${id}`,
  deleteUser: (id) => `/api/admin/users/${id}`,
  exportUsers: "/api/admin/users/export",

  /////////////////////////////<=== ADMIN HOTELS ===>/////////////////////////
  getAdminHotels: "/api/admin/hotels",
  getAdminHotelById: (id) => `/api/admin/hotels/${id}`,
  createHotel: "/api/admin/hotels",
  updateHotel: (id) => `/api/admin/hotels/${id}`,
  deleteHotel: (id) => `/api/admin/hotels/${id}`,
  bulkDeleteHotels: "/api/admin/hotels/bulk",
  bulkUpdateHotelStatus: "/api/admin/hotels/bulk/status",
  uploadHotelCoverImage: (id) => `/api/admin/hotels/${id}/upload-cover-image`,
  uploadHotelGalleryImages: (id) => `/api/admin/hotels/${id}/upload-gallery-images`,
  deleteHotelGalleryImage: (id) => `/api/admin/hotels/${id}/gallery-images`,
  exportHotels: "/api/admin/hotels/export",

  /////////////////////////////<=== ADMIN ROOMS ===>/////////////////////////
  getRooms: (hotelId) => `/api/admin/hotels/${hotelId}/rooms`,
  validateRoomName: (hotelId) => `/api/admin/hotels/${hotelId}/rooms/validate-name`,
  createRoom: (hotelId) => `/api/admin/hotels/${hotelId}/rooms`,
  updateRoom: (hotelId, roomId) => `/api/admin/hotels/${hotelId}/rooms/${roomId}`,
  deleteRoom: (hotelId, roomId) => `/api/admin/hotels/${hotelId}/rooms/${roomId}`,
  getBedTypes: "/api/admin/rooms/bed-types",
  getAvailableShifts: "/api/admin/rooms/available-shifts",

  /////////////////////////////<=== ADMIN BOOKINGS ===>///////////////////////
  getAdminBookings: "/api/admin/bookings",
  getAdminBookingById: (id) => `/api/admin/bookings/${id}`,
  updateBookingStatus: (id) => `/api/admin/bookings/${id}/status`,
  updateBooking: (id) => `/api/admin/bookings/${id}`,
  cancelBooking: (id) => `/api/admin/bookings/${id}/cancel`,
  deleteBooking: (id) => `/api/admin/bookings/${id}`,
  bulkUpdateBookingStatus: "/api/admin/bookings/bulk/status",
  getBookingSummary: "/api/admin/bookings/summary",
  exportBookings: "/api/admin/bookings/export",

  /////////////////////////////<=== ADMIN TAXI SERVICES ===>//////////////////
  getTaxiServices: "/api/admin/taxi-services",
  getTaxiServiceById: (id) => `/api/admin/taxi-services/${id}`,
  createTaxiService: "/api/admin/taxi-services",
  updateTaxiService: (id) => `/api/admin/taxi-services/${id}`,
  deleteTaxiService: (id) => `/api/admin/taxi-services/${id}`,
  updateTaxiStatus: (id) => `/api/admin/taxi-services/${id}/status`,
  bulkUpdateTaxiStatus: "/api/admin/taxi-services/bulk/status",
  uploadTaxiImage: (id) => `/api/admin/taxi-services/${id}/upload-image`,
  validateLicensePlate: "/api/admin/taxi-services/validate-license-plate",
  exportTaxiServices: "/api/admin/taxi-services/export",

  /////////////////////////////<=== ADMIN TRANSACTIONS ===>///////////////////
  getTransactions: "/api/admin/transactions",
  getTransactionById: (id) => `/api/admin/transactions/${id}`,
  processRefund: (id) => `/api/admin/transactions/${id}/refund`,
  exportTransactions: "/api/admin/transactions/export",

  /////////////////////////////<=== HEALTH CHECK ===>/////////////////////////
  healthCheck: "/api/health",
};
