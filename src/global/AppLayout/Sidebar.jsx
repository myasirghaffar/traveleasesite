"use client";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { persistor } from "../../store";
import {
  DashboardIcon,
  HotelsIcon,
  BookingsIcon,
  TaxiServicesIcon,
  UsersIcon,
  PaymentIcon,
  SettingsIcon,
  LogoutIcon,
  XIcon,
} from "../../assets/icons/icons";
import { main_logo_sidebar } from "../../assets/logos";

function Sidebar({ isMobileSidebarOpen, toggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileSidebarOpen &&
        !event.target.closest(".sidebar-content") &&
        !event.target.closest(".mobile-menu-button")
      ) {
        toggleSidebar();
      }
    };

    if (isMobileSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling when mobile sidebar is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Restore scrolling when mobile sidebar is closed
      document.body.style.overflow = "unset";
    };
  }, [isMobileSidebarOpen, toggleSidebar]);

  // React Icons for sidebar navigation

  const getRoleBasedMenuItems = (role) => {
    const menu = {
      admin: {
        main: [
          { path: "/admin/dashboard", name: "Dashboard", icon: DashboardIcon },
          { path: "/admin/hotels", name: "Hotels", icon: HotelsIcon },
          { path: "/admin/bookings", name: "Bookings", icon: BookingsIcon },
          { path: "/admin/taxi-services", name: "Taxi Services", icon: TaxiServicesIcon },
          { path: "/admin/users", name: "Users", icon: UsersIcon },
          { path: "/admin/payments", name: "Payment & Transaction", icon: PaymentIcon },
        ],
        bottom: [
          { path: "/admin/settings", name: "Settings", icon: SettingsIcon },
        ],
      },
    };

    return menu.admin;
  };

  const menuItems = getRoleBasedMenuItems("admin");
  const finalMenuItems = menuItems;

  // Utility function to render NavLink items
  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigate("/login");
  };
  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed

  const handleClickMobile = () => {
    if (isMobile) {
      toggleSidebar(); // your custom function
    }
  };

  const toggleMenuExpansion = (parentName) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [parentName]: !prev[parentName],
    }));
  };
  const renderNavLink = (item, extraClasses = "") => {
    // Check if this item should be active based on current location
    const isActive =
      location.pathname === item.path ||
      location.pathname.startsWith(item.path + "/");

    return (
      <div
        onClick={() => {
          handleClickMobile();
          // Navigate to the item path using React Router
          navigate(item.path);
        }}
        className={`
          flex items-center w-full h-[42px] pl-[10px] pr-4 gap-[10px] group transition-all duration-200 relative rounded-l-full cursor-pointer
          ${isActive
            ? "bg-white/10 text-[#1781FE]"
            : "text-white/70 hover:bg-white/5 hover:text-white"
          }
          ${extraClasses}
        `}
      >
        {/* Active state right indicator bar */}
        {isActive && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[40px] bg-[#1781FE] rounded-l-full shadow-[0_0_8px_rgba(23,129,254,0.6)]"></div>
        )}

        {/* Only show icon if item has no parent (not a nested item) */}
        {!item.parent && item.icon && (
          <div className="w-5 h-5 flex items-center justify-center">
            <item.icon className={isActive ? "text-[#1781FE]" : "text-white"} />
          </div>
        )}
        <span className="text-[15px] font-medium leading-5 font-poppins">
          {item.name}
        </span>
        {item.badge && (
          <span className="ml-auto bg-white/20 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </div>

    );
  };

  const renderSidebarContent = () => {
    // Group menu items by parent for nested structure
    const groupedMenuItems = {};
    const standaloneItems = [];
    const processedParents = new Set();

    finalMenuItems?.main?.forEach((item) => {
      if (item.parent) {
        if (!groupedMenuItems[item.parent]) {
          groupedMenuItems[item.parent] = [];
        }
        groupedMenuItems[item.parent].push(item);
      } else {
        standaloneItems.push(item);
      }
    });

    return (
      <div className="sidebar-content w-[18.5625rem] bg-black flex flex-col h-[100vh] relative pl-0 sm:pl-4 py-0 sm:py-4">
        <div className="bg-black rounded-lg flex flex-col h-full">
          {/* Mobile close button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-white/70 hover:text-white md:hidden z-50"
          >
            <XIcon size={20} />
          </button>

          {/* Brand Section */}
          <div className="py-1 px-6">
            <h1 className="text-white text-xl font-bold font-poppins tracking-wide">
              <img src={main_logo_sidebar} alt="Logo" className="w-32 h-32" />
            </h1>
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 pl-4 pr-0">

            <div className="space-y-1">
              {/* Render items in order, checking for parent groups */}
              {finalMenuItems?.main?.map((item, index) => {
                // If this item has a parent and we haven't processed this parent yet
                if (item.parent && !processedParents.has(item.parent)) {
                  processedParents.add(item.parent);
                  const children = groupedMenuItems[item.parent];
                  const hasActiveChild = children.some(
                    (child) =>
                      location.pathname === child.path ||
                      location.pathname.startsWith(child.path + "/")
                  );
                  const isExpanded = expandedMenus[item.parent];

                  return (
                    <div key={`parent-${item.parent}`} className="space-y-1">
                      {/* Parent header */}
                      <div
                        onClick={() => toggleMenuExpansion(item.parent)}
                        className={`flex items-center w-full h-[42px] pl-[10px] pr-4 gap-[10px] group transition-all duration-200 relative rounded-md cursor-pointer ${hasActiveChild
                          ? "bg-secondary text-white"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                          }`}
                      >
                        <div
                          className={`w-5 h-5 flex items-center justify-center ${hasActiveChild ? "text-white" : "text-white/70"
                            }`}
                        >
                          <TeacherIcon />
                        </div>
                        <span className="text-base font-normal leading-5 font-poppins">
                          {item.parent}
                        </span>
                        <div className="ml-auto">
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""
                              } ${hasActiveChild ? "text-white" : "text-white/70"
                              }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Children items - only show when expanded */}
                      {isExpanded && (
                        <div className="space-y-1">
                          {children.map((child, childIndex) => (
                            <div
                              key={`child-${item.parent}-${childIndex}`}
                              className="ml-6"
                            >
                              {renderNavLink(child, "text-sm")}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // If this is a standalone item (no parent), render it normally
                if (!item.parent) {
                  return <div key={index}>{renderNavLink(item)}</div>;
                }

                // If this item has a parent but we've already processed the parent, skip it
                return null;
              })}
            </div>
          </nav>


          {/* Bottom Navigation (Settings) */}
          <div className="mt-auto pl-4 pr-0">

            <div className="border-t border-white/10 mb-4 mx-2"></div>
            <div className="space-y-0.5 pb-2">
              {finalMenuItems?.bottom?.map((item, index) => (
                <div key={index}>{renderNavLink(item)}</div>
              ))}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center w-full h-[42px] pl-[10px] pr-4 gap-[10px] text-white/70 hover:text-white hover:bg-white/5 rounded-l-full transition-all duration-200 group"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <LogoutIcon className="text-white group-hover:text-[#1781FE] transition-colors" />
                </div>
                <span className="text-[15px] font-medium leading-5 font-poppins">
                  Logout
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar - always visible on larger screens */}
      <aside className="hidden md:block mt-0 bg-primary-500">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Sidebar - only visible when toggled */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
      >
        {renderSidebarContent()}
      </aside>

      {/* Overlay when mobile sidebar is open */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

export default Sidebar;
