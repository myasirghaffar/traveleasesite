import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!isAuthenticated || !user) {
      // Show error toast
      toast.error("Você precisa fazer login para acessar esta página.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect to login page
      navigate("/login", {
        replace: true,
        state: { from: location.pathname }, // Save the attempted location
      });
      return;
    }

    // Check if user is trying to access a route that matches their role
    const currentPath = location.pathname;
    const userRole = user.role;

    // Check if accessing admin routes - require admin role
    if (currentPath.startsWith("/admin")) {
      if (userRole !== "admin") {
        // Show error toast
        toast.error("Only admin can access the dashboard.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Redirect to unauthorized page with state indicating admin access issue
        navigate("/unauthorized", { 
          replace: true,
          state: { reason: "admin_access_required", attemptedPath: currentPath }
        });
        return;
      }
    }

    // Map roles to their expected route prefixes (only include routes that actually exist)
    const roleRouteMap = {
      "admin": "/admin",
      "CTS Admin": "/admin",
    };

    const expectedRoutePrefix = roleRouteMap[userRole];

    // If user is trying to access a route that doesn't match their role
    if (expectedRoutePrefix && !currentPath.startsWith(expectedRoutePrefix)) {
      // Show warning toast
      toast.warning("Você não tem permissão para acessar esta página.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect to their appropriate dashboard
      navigate(`${expectedRoutePrefix}/dashboard`, { replace: true });
      return;
    }
  }, [isAuthenticated, user, navigate, location]);

  // If not authenticated, don't render children
  if (!isAuthenticated || !user) {
    return null;
  }

  // Check if accessing admin routes - require admin role (additional check before rendering)
  const currentPath = location.pathname;
  const userRole = user.role;
  
  if (currentPath.startsWith("/admin") && userRole !== "admin") {
    return null; // Will be handled by useEffect redirect
  }

  // If authenticated and authorized, render children
  return children;
};

export default AuthGuard;
