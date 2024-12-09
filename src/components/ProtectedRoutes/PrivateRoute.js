import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Here, you should check for your authentication token or session
  const isAuthenticated = !!Cookies.get("token"); // Replace with your actual authentication logic

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
