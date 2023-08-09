import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  logged: boolean;
  allowedRoles: string[];
}

export const ProtectedRoute = ({
  children,
  logged,
  allowedRoles,
}: ProtectedRouteProps) => {
  const userRole = localStorage.getItem("role") || "";

  if (!logged || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
