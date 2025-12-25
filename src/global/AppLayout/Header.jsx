import { Menu } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import { persistor } from "../../store";
import { useGetDriverAlertReminderQuery } from "../../services/driver/driverApi";
import { NotificationIcon2 } from "../../assets/icons/icons";
import Perfil from "../../assets/images/Perfil.jpg";

function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigate("/login");
  };

  const { data: alertsData } = useGetDriverAlertReminderQuery();
  const unreadCount =
    alertsData?.data?.alerts?.filter((alert) => !alert.read)?.length || 0;

  const userName = user?.name || "User name"; // Fallback if no name

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_4px_5px_rgba(0,0,0,0.08)] h-20">
      <div className="flex items-center justify-between px-6 py-4 h-full">
        {/* Left: Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="block md:hidden text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Right: Icons + Profile */}
        <div className="flex items-center gap-6 flex-1 justify-end">

          {/* Notification Bell */}
          <div className="relative">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100/50">
              <NotificationIcon2 className="w-6 h-6 text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#3DF21E] text-white text-[11px] font-black rounded-full w-[22px] h-[22px] flex items-center justify-center shadow-sm">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <img
              src={Perfil}
              alt="User avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-base font-semibold text-gray-900 hidden md:block">
              {userName}
            </span>
            {/* Chevron Down */}
            <svg
              className="w-4 h-4 text-gray-900 hidden md:block"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;