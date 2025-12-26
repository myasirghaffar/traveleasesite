import { API_END_POINTS } from "./ApiEndpoints";
import { SplitApiSettings } from "./SplitApiSetting";

export const api = SplitApiSettings.injectEndpoints({
  reducerPath: "api",
  refetchOnMountOrArgChange: true,
  tagTypes: ['User', 'Hotel', 'Room', 'Booking', 'Taxi', 'TaxiBooking', 'Transaction', 'Dashboard'],
  endpoints: (builder) => ({
    /////////////////////////////<=== AUTH MUTATIONS ===>//////////////////////////////
    register: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.register,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.login,
        method: "POST",
        body: data,
      }),
    }),
    forgetPassword: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.forgetPassword,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.resetPassword,
        method: "POST",
        body: data,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.updateUserProfile,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'User', id: 'user' }],
    }),
    editUser: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.editUser,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'User', id: 'user' }],
    }),

    /////////////////////////////<=== AUTH QUERIES ===>////////////////////////////////
    getUserProfile: builder.query({
      query: () => ({
        url: API_END_POINTS.getUserProfile,
        method: "GET",
      }),
      providesTags: [{ type: "User", id: "user" }],
    }),

    /////////////////////////////<=== WEBSITE HOTELS QUERIES ===>//////////////////////
    getHotels: builder.query({
      query: (params) => ({
        url: API_END_POINTS.getHotels,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Hotel", id: "LIST" }],
    }),
    getHotelById: builder.query({
      query: (id) => ({
        url: API_END_POINTS.getHotelById(id),
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Hotel", id }],
    }),
    checkRoomAvailability: builder.query({
      query: ({ hotelId, roomId, ...params }) => ({
        url: API_END_POINTS.checkRoomAvailability(hotelId, roomId),
        method: "GET",
        params,
      }),
    }),

    /////////////////////////////<=== WEBSITE BOOKINGS MUTATIONS ===>//////////////////
    createBooking: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.createBooking,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Booking", id: "LIST" }],
    }),

    /////////////////////////////<=== WEBSITE TAXIS QUERIES ===>////////////////////////
    getTaxis: builder.query({
      query: (params) => ({
        url: API_END_POINTS.getTaxis,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Taxi", id: "LIST" }],
    }),
    getTaxiById: builder.query({
      query: (id) => ({
        url: API_END_POINTS.getTaxiById(id),
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Taxi", id }],
    }),
    checkTaxiAvailability: builder.query({
      query: ({ taxiId, ...params }) => ({
        url: API_END_POINTS.checkTaxiAvailability(taxiId),
        method: "GET",
        params,
      }),
    }),

    /////////////////////////////<=== WEBSITE TAXI BOOKINGS ===>///////////////////////
    calculateFare: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.calculateFare,
        method: "POST",
        body: data,
      }),
    }),
    createTaxiBooking: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.createTaxiBooking,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "TaxiBooking", id: "LIST" }],
    }),

    /////////////////////////////<=== ADMIN DASHBOARD QUERIES ===>/////////////////////
    getAdminDashboardStats: builder.query({
      query: () => ({
        url: API_END_POINTS.getAdminDashboardStats,
        method: "GET",
      }),
      providesTags: [{ type: "Dashboard", id: "stats" }],
    }),
    getAdminDashboardOverview: builder.query({
      query: () => ({
        url: API_END_POINTS.getAdminDashboardOverview,
        method: "GET",
      }),
      providesTags: [{ type: "Dashboard", id: "overview" }],
    }),
    getAdminRevenueData: builder.query({
      query: (params) => ({
        url: API_END_POINTS.getAdminRevenueData,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Dashboard", id: "revenue" }],
    }),
    getAdminUnreadNotificationsCount: builder.query({
      query: () => ({
        url: API_END_POINTS.getAdminUnreadNotificationsCount,
        method: "GET",
      }),
      providesTags: [{ type: "Dashboard", id: "notifications" }],
    }),

    /////////////////////////////<=== ADMIN USERS ===>///////////////////////////////
    getUsers: builder.query({
      query: (params) => ({
        url: API_END_POINTS.getUsers,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: API_END_POINTS.getUserById(id),
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: API_END_POINTS.deleteUser(id),
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    exportUsers: builder.query({
      query: (params) => ({
        url: API_END_POINTS.exportUsers,
        method: "GET",
        params,
        responseHandler: (response) => response.blob(),
      }),
    }),

    /////////////////////////////<=== ADMIN HOTELS ===>///////////////////////////////
    getAdminHotels: builder.query({
      query: (params) => ({
        url: API_END_POINTS.getAdminHotels,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Hotel", id: "LIST" }],
    }),
    getAdminHotelById: builder.query({
      query: (id) => ({
        url: API_END_POINTS.getAdminHotelById(id),
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Hotel", id }],
    }),
    createHotel: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.createHotel,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Hotel", id: "LIST" }],
    }),
    updateHotel: builder.mutation({
      query: ({ id, data }) => ({
        url: API_END_POINTS.updateHotel(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Hotel", id }, { type: "Hotel", id: "LIST" }],
    }),
    deleteHotel: builder.mutation({
      query: (id) => ({
        url: API_END_POINTS.deleteHotel(id),
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Hotel", id: "LIST" }],
    }),
    bulkDeleteHotels: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.bulkDeleteHotels,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: [{ type: "Hotel", id: "LIST" }],
    }),
    bulkUpdateHotelStatus: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.bulkUpdateHotelStatus,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Hotel", id: "LIST" }],
    }),
    uploadHotelCoverImage: builder.mutation({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append('cover_image', file);
        return {
          url: API_END_POINTS.uploadHotelCoverImage(id),
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Hotel", id }],
    }),
    uploadHotelGalleryImages: builder.mutation({
      query: ({ id, files }) => {
        const formData = new FormData();
        files.forEach(file => formData.append('gallery_images', file));
        return {
          url: API_END_POINTS.uploadHotelGalleryImages(id),
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Hotel", id }],
    }),
    deleteHotelGalleryImage: builder.mutation({
      query: ({ id, imageUrl }) => ({
        url: API_END_POINTS.deleteHotelGalleryImage(id),
        method: "DELETE",
        body: { imageUrl },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Hotel", id }],
    }),
    exportHotels: builder.query({
      query: (params) => ({
        url: API_END_POINTS.exportHotels,
        method: "GET",
        params,
        responseHandler: (response) => response.blob(),
      }),
    }),

    /////////////////////////////<=== ADMIN ROOMS ===>///////////////////////////////
    getRooms: builder.query({
      query: ({ hotelId, ...params }) => ({
        url: API_END_POINTS.getRooms(hotelId),
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Room", id: "LIST" }],
    }),
    validateRoomName: builder.query({
      query: ({ hotelId, ...params }) => ({
        url: API_END_POINTS.validateRoomName(hotelId),
        method: "GET",
        params,
      }),
    }),
    createRoom: builder.mutation({
      query: ({ hotelId, data }) => ({
        url: API_END_POINTS.createRoom(hotelId),
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Room", id: "LIST" }],
    }),
    updateRoom: builder.mutation({
      query: ({ hotelId, roomId, data }) => ({
        url: API_END_POINTS.updateRoom(hotelId, roomId),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { roomId }) => [{ type: "Room", id: roomId }, { type: "Room", id: "LIST" }],
    }),
    deleteRoom: builder.mutation({
      query: ({ hotelId, roomId }) => ({
        url: API_END_POINTS.deleteRoom(hotelId, roomId),
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Room", id: "LIST" }],
    }),
    getBedTypes: builder.query({
      query: () => ({
        url: API_END_POINTS.getBedTypes,
        method: "GET",
      }),
    }),
    getAvailableShifts: builder.query({
      query: () => ({
        url: API_END_POINTS.getAvailableShifts,
        method: "GET",
      }),
    }),

    /////////////////////////////<=== ADMIN BOOKINGS ===>/////////////////////////////
    getAdminBookings: builder.query({
      query: (params) => ({
        url: API_END_POINTS.getAdminBookings,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Booking", id: "LIST" }],
    }),
    getAdminBookingById: builder.query({
      query: (id) => ({
        url: API_END_POINTS.getAdminBookingById(id),
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Booking", id }],
    }),
    updateBookingStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: API_END_POINTS.updateBookingStatus(id),
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Booking", id }, { type: "Booking", id: "LIST" }],
    }),
    updateBooking: builder.mutation({
      query: ({ id, data }) => ({
        url: API_END_POINTS.updateBooking(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Booking", id }, { type: "Booking", id: "LIST" }],
    }),
    cancelBooking: builder.mutation({
      query: ({ id, data }) => ({
        url: API_END_POINTS.cancelBooking(id),
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Booking", id }, { type: "Booking", id: "LIST" }],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: API_END_POINTS.deleteBooking(id),
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Booking", id: "LIST" }],
    }),
    bulkUpdateBookingStatus: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.bulkUpdateBookingStatus,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Booking", id: "LIST" }],
    }),
    getBookingSummary: builder.query({
      query: (params) => ({
        url: API_END_POINTS.getBookingSummary,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Booking", id: "summary" }],
    }),
    exportBookings: builder.query({
      query: (params) => ({
        url: API_END_POINTS.exportBookings,
        method: "GET",
        params,
        responseHandler: (response) => response.blob(),
      }),
    }),

    /////////////////////////////<=== ADMIN TAXI SERVICES ===>/////////////////////////
    getTaxiServices: builder.query({
      query: (params) => ({
        url: API_END_POINTS.getTaxiServices,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Taxi", id: "LIST" }],
    }),
    getTaxiServiceById: builder.query({
      query: (id) => ({
        url: API_END_POINTS.getTaxiServiceById(id),
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Taxi", id }],
    }),
    createTaxiService: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.createTaxiService,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Taxi", id: "LIST" }],
    }),
    updateTaxiService: builder.mutation({
      query: ({ id, data }) => ({
        url: API_END_POINTS.updateTaxiService(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Taxi", id }, { type: "Taxi", id: "LIST" }],
    }),
    deleteTaxiService: builder.mutation({
      query: (id) => ({
        url: API_END_POINTS.deleteTaxiService(id),
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Taxi", id: "LIST" }],
    }),
    updateTaxiStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: API_END_POINTS.updateTaxiStatus(id),
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Taxi", id }, { type: "Taxi", id: "LIST" }],
    }),
    bulkUpdateTaxiStatus: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.bulkUpdateTaxiStatus,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Taxi", id: "LIST" }],
    }),
    uploadTaxiImage: builder.mutation({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append('image', file);
        return {
          url: API_END_POINTS.uploadTaxiImage(id),
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Taxi", id }],
    }),
    validateLicensePlate: builder.query({
      query: (params) => ({
        url: API_END_POINTS.validateLicensePlate,
        method: "GET",
        params,
      }),
    }),
    exportTaxiServices: builder.query({
      query: (params) => ({
        url: API_END_POINTS.exportTaxiServices,
        method: "GET",
        params,
        responseHandler: (response) => response.blob(),
      }),
    }),

    /////////////////////////////<=== ADMIN TRANSACTIONS ===>/////////////////////////
    getTransactions: builder.query({
      query: (params) => ({
        url: API_END_POINTS.getTransactions,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Transaction", id: "LIST" }],
    }),
    getTransactionById: builder.query({
      query: (id) => ({
        url: API_END_POINTS.getTransactionById(id),
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Transaction", id }],
    }),
    processRefund: builder.mutation({
      query: ({ id, data }) => ({
        url: API_END_POINTS.processRefund(id),
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Transaction", id }, { type: "Transaction", id: "LIST" }],
    }),
    exportTransactions: builder.query({
      query: (params) => ({
        url: API_END_POINTS.exportTransactions,
        method: "GET",
        params,
        responseHandler: (response) => response.blob(),
      }),
    }),

    /////////////////////////////<=== HEALTH CHECK ===>///////////////////////////////
    healthCheck: builder.query({
      query: () => ({
        url: API_END_POINTS.healthCheck,
        method: "GET",
      }),
    }),
  }),

  overrideExisting: true,
});

export const {
  /////////////////////////////<=== AUTH MUTATIONS ===>//////////////////////////////
  useRegisterMutation,
  useLoginMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserProfileMutation,
  useEditUserMutation,

  /////////////////////////////<=== AUTH QUERIES ===>////////////////////////////////
  useGetUserProfileQuery,

  /////////////////////////////<=== WEBSITE HOTELS QUERIES ===>//////////////////////
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useCheckRoomAvailabilityQuery,

  /////////////////////////////<=== WEBSITE BOOKINGS MUTATIONS ===>//////////////////
  useCreateBookingMutation,

  /////////////////////////////<=== WEBSITE TAXIS QUERIES ===>////////////////////////
  useGetTaxisQuery,
  useGetTaxiByIdQuery,
  useCheckTaxiAvailabilityQuery,

  /////////////////////////////<=== WEBSITE TAXI BOOKINGS ===>///////////////////////
  useCalculateFareMutation,
  useCreateTaxiBookingMutation,

  /////////////////////////////<=== ADMIN DASHBOARD QUERIES ===>/////////////////////
  useGetAdminDashboardStatsQuery,
  useGetAdminDashboardOverviewQuery,
  useGetAdminRevenueDataQuery,
  useGetAdminUnreadNotificationsCountQuery,

  /////////////////////////////<=== ADMIN USERS ===>///////////////////////////////
  useGetUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useExportUsersQuery,

  /////////////////////////////<=== ADMIN HOTELS ===>///////////////////////////////
  useGetAdminHotelsQuery,
  useGetAdminHotelByIdQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
  useBulkDeleteHotelsMutation,
  useBulkUpdateHotelStatusMutation,
  useUploadHotelCoverImageMutation,
  useUploadHotelGalleryImagesMutation,
  useDeleteHotelGalleryImageMutation,
  useExportHotelsQuery,

  /////////////////////////////<=== ADMIN ROOMS ===>///////////////////////////////
  useGetRoomsQuery,
  useValidateRoomNameQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useGetBedTypesQuery,
  useGetAvailableShiftsQuery,

  /////////////////////////////<=== ADMIN BOOKINGS ===>/////////////////////////////
  useGetAdminBookingsQuery,
  useGetAdminBookingByIdQuery,
  useUpdateBookingStatusMutation,
  useUpdateBookingMutation,
  useCancelBookingMutation,
  useDeleteBookingMutation,
  useBulkUpdateBookingStatusMutation,
  useGetBookingSummaryQuery,
  useExportBookingsQuery,

  /////////////////////////////<=== ADMIN TAXI SERVICES ===>/////////////////////////
  useGetTaxiServicesQuery,
  useGetTaxiServiceByIdQuery,
  useCreateTaxiServiceMutation,
  useUpdateTaxiServiceMutation,
  useDeleteTaxiServiceMutation,
  useUpdateTaxiStatusMutation,
  useBulkUpdateTaxiStatusMutation,
  useUploadTaxiImageMutation,
  useValidateLicensePlateQuery,
  useExportTaxiServicesQuery,

  /////////////////////////////<=== ADMIN TRANSACTIONS ===>/////////////////////////
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useProcessRefundMutation,
  useExportTransactionsQuery,

  /////////////////////////////<=== HEALTH CHECK ===>///////////////////////////////
  useHealthCheckQuery,
} = api;

