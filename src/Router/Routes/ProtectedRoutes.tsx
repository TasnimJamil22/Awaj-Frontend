 import { Navigate } from "react-router-dom";
import React from "react";

interface Props {
  children: React.ReactNode;
  roles?: string[]; // optional array of roles
}

const ProtectedRoute = ({ children, roles }: Props) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && role && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

// import { Navigate } from "react-router-dom";

// interface ProtectedRouteProps {
//   user: { role: string } | null;
//   allowedRoles: string[];
//   children: React.ReactNode;
// }

// const ProtectedRoute = ({ user, allowedRoles, children }: ProtectedRouteProps) => {
//   if (!user) return <Navigate to="/login" />;
//   if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;
//   return children;
// };

// export default ProtectedRoute