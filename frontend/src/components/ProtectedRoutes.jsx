import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { checkAuth } from "../api/auth.js";
import Navbar from "./Navbar/Navbar.jsx";

const ProtectedRoutes = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    checkAuth().then((ok) => {
      setAllowed(ok);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-b-4 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg font-semibold">Checking authentication...</p>
        </div>
      </div>
    );

  if (!allowed) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="mt-20 max-w-7xl mx-auto p-4 sm:p-6">{children}</div>
    </div>
  );
};

export default ProtectedRoutes;
