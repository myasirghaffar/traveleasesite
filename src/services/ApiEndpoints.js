export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
// export const BASE_URL = 'https://b0fd-139-135-36-92.ngrok-free.app'
export const BASE_URL_IMAGE = import.meta.env.VITE_FILES_URL || '';

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
