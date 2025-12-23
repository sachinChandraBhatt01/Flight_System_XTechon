import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios.js"

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    api.post("/auth/logout").then(()=>navigate("/login")).catch((e)=> console.log(e))
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="shrink-0 font-bold text-xl tracking-wide">
            FlightBook
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <Link to="/" className="hover:bg-blue-500 px-3 py-2 rounded transition">
              Flights
            </Link>
            <Link to="/wallet" className="hover:bg-blue-500 px-3 py-2 rounded transition">
              Wallet
            </Link>
            <Link to="/bookings" className="hover:bg-blue-500 px-3 py-2 rounded transition">
              Bookings
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 px-4 pb-4 space-y-2">
          <Link to="/" onClick={() => setIsOpen(false)} className="block hover:bg-blue-500 px-3 py-2 rounded transition">
            Flights
          </Link>
          <Link to="/wallet" onClick={() => setIsOpen(false)} className="block hover:bg-blue-500 px-3 py-2 rounded transition">
            Wallet
          </Link>
          <Link to="/bookings" onClick={() => setIsOpen(false)} className="block hover:bg-blue-500 px-3 py-2 rounded transition">
            Bookings
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-blue-600 bg-white px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
