import React, { useState, useEffect } from 'react';
import api from "../../api/axios.js";

const Wallet = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    api.get("/wallet")
      .then(res => setBalance(res.data.balance))
      .catch(() => alert("Not logged in"));
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">My Wallet</h2>
      <div className="flex items-center justify-center bg-green-100 p-6 rounded-lg">
        <span className="text-3xl font-semibold text-green-700">₹{balance}</span>
      </div>
      <p className="text-center text-gray-500 mt-4">
        Your wallet balance is available for bookings.
      </p>
    </div>
  );
};

export default Wallet;
