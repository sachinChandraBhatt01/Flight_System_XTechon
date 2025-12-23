import React, { useEffect, useState } from 'react';
import api from "../../api/axios.js";

const BookingHistory = () => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    api.get("/booking")
      .then(res => setBook(res.data.data))
      .catch(() => alert("Not authorized"));
  }, []);

  const downloadTicket = async (pnr) => {
    try {
      const res = await api.get(`/booking/ticket/${pnr}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Ticket_${pnr}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Failed to download ticket');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">My Bookings</h2>

      {book.length === 0 ? (
        <p className="text-center text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="grid gap-4">
          {book.map((b, idx) => (
            <div key={idx} className="flex justify-between items-center p-4 border rounded-lg shadow hover:shadow-md transition">
              <div>
                <p className="font-semibold text-lg">PNR: <span className="text-gray-700">{b.pnr}</span></p>
                <p className="text-gray-600">Price: <span className="font-medium text-green-600">₹{b.price}</span></p>
              </div>
              <button
                onClick={() => downloadTicket(b.pnr)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Download Ticket
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
