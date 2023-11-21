import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return <Navigate to="/users" replace />;
  }

  return (
    <Routes>
      <Route path="/users" element={<Users />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
