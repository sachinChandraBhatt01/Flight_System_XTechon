import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const FlightSearch = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengerName, setPassengerName] = useState("");

  // 🔹 initial load
  useEffect(() => {
    let ignore = false;

    const loadFlights = async () => {
      try {
        const res = await api.get("/flights");
        if (!ignore) setFlights(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadFlights();
    return () => {
      ignore = true;
    };
  }, []);

  // 🔹 search flights
  const handleSearch = async () => {
    if (!from || !to) return alert("Enter from & to");

    setLoading(true);
    try {
      const res = await api.get(`/flights/search?from=${from}&to=${to}`);
      console.log(res)
      setFlights(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 booking
  const handleBooking = async () => {
    try {
      const res = await api.post("/booking", {
        flightId: selectedFlight._id,
        passengerName,
      });

      // 🔥 instant update
      setFlights((prev) =>
        prev.map((f) =>
          f._id === res.data.updatedFlight._id
            ? res.data.updatedFlight
            : f
        )
      );

      setSelectedFlight(null);
      setPassengerName("");
      alert("Booking successful");
    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search Flights</h2>

      {/* SEARCH */}
      <div className="flex gap-2 mb-6">
        <input
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 flex-1"
        />
        <input
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {/* FLIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {flights.map((f) => (
          <div key={f._id} className="border p-4 rounded">
            <h3 className="font-semibold">{f.airline}</h3>
            <p>
              {f.departure_city} → {f.arrival_city}
            </p>
            <p className="font-bold">₹{f.current_price}</p>
            <p className="text-sm">Seats: {f.available_seats}</p>

            <button
              onClick={() => setSelectedFlight(f)}
              className="mt-2 bg-green-600 text-white px-3 py-1"
            >
              Book
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedFlight && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80">
            <h3 className="font-bold mb-2">{selectedFlight.airline}</h3>

            <input
              placeholder="Passenger Name"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              className="border p-2 w-full mb-3"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setSelectedFlight(null)}>
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="bg-blue-600 text-white px-4"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
