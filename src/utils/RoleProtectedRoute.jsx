// components/RoleProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
    const user = useSelector((state) => state.auth.user?.role);
    // const user = true;
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // const isAuthenticated = true;

    const location = useLocation();
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(user)) {
        // Check if this is an admin route access attempt
        const isAdminRoute = location.pathname.startsWith("/admin");
        const reason = isAdminRoute ? "admin_access_required" : "insufficient_permissions";
        
        return <Navigate to="/unauthorized" state={{ reason, attemptedPath: location.pathname, requiredRoles: allowedRoles }} replace />;
    }

    return children;
};

export default RoleProtectedRoute;
