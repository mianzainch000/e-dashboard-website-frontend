import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = !!Cookies.get("token"); // Check if the user is authenticated

  return isAuthenticated ? <Navigate to="/home" /> : <Outlet />; // Use Outlet to render child routes
};

export default PublicRoute;
