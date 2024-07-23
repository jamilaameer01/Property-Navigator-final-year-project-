import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Component for protecting routes accessible only to admin users
export default function AdminRoute({ children }) {
  // Access the current user from Redux store
  const { currentUser } = useSelector((state) => state.user);
  // If user is an admin, render the children components
  // If not, redirect to the home page ("/")
  return currentUser?.role === 1 ? <>{children}</> : <Navigate to="/" />;
}
