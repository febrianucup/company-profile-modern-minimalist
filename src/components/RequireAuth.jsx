import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../lib/auth";

/**
 * Route guard for /admin: sends signed-out visitors to the login page,
 * remembering where they were headed.
 */
function RequireAuth() {
  const session = useAuth();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default RequireAuth;
