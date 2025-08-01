import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  
  if (!token) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userData.role)) {
    // Role not authorized, redirect to appropriate dashboard
    if (userData.role === 'teacher') {
      return <Navigate to="/teacher" replace />;
    }
    return <Navigate to="/student" replace />;
  }

  // Authorized, render children
  return children;
};

export default PrivateRoute; 