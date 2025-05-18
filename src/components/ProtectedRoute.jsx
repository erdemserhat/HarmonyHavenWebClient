import { Navigate, useLocation } from 'react-router-dom';
import { useAuthChecker } from '../context/AuthContext';

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthChecker();
  const location = useLocation();

  // If authentication is still being checked (isAuthenticated is null), render nothing
  if (isAuthenticated === null) {
    return null;
  }

  // If not authenticated, redirect to login with a redirect parameter
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render the children
  return children;
} 