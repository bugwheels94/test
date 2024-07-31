import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from './AuthProvider';

interface UnprotectedRouteProps {
  children: JSX.Element;
}

export const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/" />;
  }

  return children;
};

// AuthContext.tsx
