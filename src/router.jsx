import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./global/AppLayout";
import Login from "./pages/Login";
import WebLayout from "./global/WebLayout";
import Homepage from "./pages/website/homepage";
import HotelListingsPage from "./pages/website/hotellistings";
import HotelBookingPage from "./pages/website/hotellistings/features/HotelBookingPage";
import HotelBookingForm from "./pages/website/hotellistings/features/HotelBookingForm";
import Signup from "./pages/Signup";
import UnauthorizedPage from "./pages/Unauthor";
import AuthGuard from "./components/AuthGuard";
import AuthRedirect from "./utils/AuthRedirect";
import ScrollToTop from "./components/ScrollToTop";
import RoleProtectedRoute from "./utils/RoleProtectedRoute";

// Dashboard imports
import AdminDashboard from "./pages/adminRole/dashboard";
import ManageHotels from "./pages/adminRole/hotelsmanage";
import ManageUsers from "./pages/adminRole/usermanage";
import HotelBookings from "./pages/adminRole/hotelbookings";
import ManageTaxi from "./pages/adminRole/taximanage";
import PaymentPage from "./pages/adminRole/paymentpage";



import TaxiBookingsPage from "./pages/website/taxibookings";
import TaxiBookingPage from "./pages/website/taxibookings/features/TaxiBookingPage";
import TaxiBookingForm from "./pages/website/taxibookings/features/TaxiBookingForm";
import ContactPage from "./pages/website/contactpage";

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Root route - redirect based on authentication */}
        {/* Website Routes - Using WebLayout */}
        <Route element={<WebLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/hotel-listing" element={<HotelListingsPage />} />
          <Route path="/hotel-booking/:id" element={<HotelBookingPage />} />
          <Route path="/hotel-checkout/:id" element={<HotelBookingForm />} />
          <Route path="/taxi-listing" element={<TaxiBookingsPage />} />
          <Route path="/taxi-booking/:id" element={<TaxiBookingPage />} />
          <Route path="/taxi-checkout/:id" element={<TaxiBookingForm />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Authentication Routes - No Layout (Full Page) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Admin Dashboard Routes - Using AppLayout */}
        <Route
          path="/admin"
          element={
            <AuthGuard>
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AppLayout />
              </RoleProtectedRoute>
            </AuthGuard>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="hotels" element={<ManageHotels />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="bookings" element={<HotelBookings />} />
          <Route path="taxi-services" element={<ManageTaxi />} />
          <Route path="payments" element={<PaymentPage />} />



        </Route>



        {/* Catch all route for 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-800">
                <h1 className="text-4xl font-poppins font-bold mb-4">404</h1>
                <p className="text-xl font-poppins">Page not found</p>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default AppRouter;
