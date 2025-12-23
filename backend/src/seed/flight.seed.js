import connectDB from "../config/db.js";
import Flight from "../models/Flight.model.js";

const flights = [
  // ===== Delhi ↔ Mumbai =====
  { flight_id: "AI101", airline: "Air India", departure_city: "delhi", arrival_city: "mumbai", departure_time: new Date("2025-12-22T06:00:00Z"), arrival_time: new Date("2025-12-22T08:00:00Z"), duration_minutes: 120, base_price: 2500, current_price: 2500, total_seats: 180, available_seats: 180 },
  { flight_id: "AI102", airline: "Air India", departure_city: "delhi", arrival_city: "mumbai", departure_time: new Date("2025-12-22T09:00:00Z"), arrival_time: new Date("2025-12-22T11:00:00Z"), duration_minutes: 120, base_price: 2600, current_price: 2600, total_seats: 180, available_seats: 180 },
  { flight_id: "AI103", airline: "Air India", departure_city: "delhi", arrival_city: "mumbai", departure_time: new Date("2025-12-22T12:00:00Z"), arrival_time: new Date("2025-12-22T14:00:00Z"), duration_minutes: 120, base_price: 2700, current_price: 2700, total_seats: 180, available_seats: 180 },
  { flight_id: "AI104", airline: "Air India", departure_city: "mumbai", arrival_city: "delhi", departure_time: new Date("2025-12-22T15:00:00Z"), arrival_time: new Date("2025-12-22T17:00:00Z"), duration_minutes: 120, base_price: 2500, current_price: 2500, total_seats: 180, available_seats: 180 },
  { flight_id: "AI105", airline: "Air India", departure_city: "mumbai", arrival_city: "delhi", departure_time: new Date("2025-12-22T18:00:00Z"), arrival_time: new Date("2025-12-22T20:00:00Z"), duration_minutes: 120, base_price: 2600, current_price: 2600, total_seats: 180, available_seats: 180 },
  { flight_id: "AI106", airline: "Air India", departure_city: "mumbai", arrival_city: "delhi", departure_time: new Date("2025-12-22T21:00:00Z"), arrival_time: new Date("2025-12-22T23:00:00Z"), duration_minutes: 120, base_price: 2700, current_price: 2700, total_seats: 180, available_seats: 180 },

  // ===== Bangalore ↔ Chennai =====
  { flight_id: "IND201", airline: "IndiGo", departure_city: "bangalore", arrival_city: "chennai", departure_time: new Date("2025-12-22T05:30:00Z"), arrival_time: new Date("2025-12-22T07:00:00Z"), duration_minutes: 90, base_price: 2200, current_price: 2200, total_seats: 150, available_seats: 150 },
  { flight_id: "IND202", airline: "IndiGo", departure_city: "bangalore", arrival_city: "chennai", departure_time: new Date("2025-12-22T08:00:00Z"), arrival_time: new Date("2025-12-22T09:30:00Z"), duration_minutes: 90, base_price: 2300, current_price: 2300, total_seats: 150, available_seats: 150 },
  { flight_id: "IND203", airline: "IndiGo", departure_city: "bangalore", arrival_city: "chennai", departure_time: new Date("2025-12-22T11:00:00Z"), arrival_time: new Date("2025-12-22T12:30:00Z"), duration_minutes: 90, base_price: 2400, current_price: 2400, total_seats: 150, available_seats: 150 },
  { flight_id: "IND204", airline: "IndiGo", departure_city: "chennai", arrival_city: "bangalore", departure_time: new Date("2025-12-22T13:00:00Z"), arrival_time: new Date("2025-12-22T14:30:00Z"), duration_minutes: 90, base_price: 2200, current_price: 2200, total_seats: 150, available_seats: 150 },
  { flight_id: "IND205", airline: "IndiGo", departure_city: "chennai", arrival_city: "bangalore", departure_time: new Date("2025-12-22T16:00:00Z"), arrival_time: new Date("2025-12-22T17:30:00Z"), duration_minutes: 90, base_price: 2300, current_price: 2300, total_seats: 150, available_seats: 150 },
  { flight_id: "IND206", airline: "IndiGo", departure_city: "chennai", arrival_city: "bangalore", departure_time: new Date("2025-12-22T19:00:00Z"), arrival_time: new Date("2025-12-22T20:30:00Z"), duration_minutes: 90, base_price: 2400, current_price: 2400, total_seats: 150, available_seats: 150 },

  // ===== Delhi ↔ Bangalore =====
  { flight_id: "VST301", airline: "Vistara", departure_city: "delhi", arrival_city: "bangalore", departure_time: new Date("2025-12-22T06:30:00Z"), arrival_time: new Date("2025-12-22T09:00:00Z"), duration_minutes: 150, base_price: 2800, current_price: 2800, total_seats: 170, available_seats: 170 },
  { flight_id: "VST302", airline: "Vistara", departure_city: "delhi", arrival_city: "bangalore", departure_time: new Date("2025-12-22T10:00:00Z"), arrival_time: new Date("2025-12-22T12:30:00Z"), duration_minutes: 150, base_price: 2900, current_price: 2900, total_seats: 170, available_seats: 170 },
  { flight_id: "VST303", airline: "Vistara", departure_city: "delhi", arrival_city: "bangalore", departure_time: new Date("2025-12-22T13:00:00Z"), arrival_time: new Date("2025-12-22T15:30:00Z"), duration_minutes: 150, base_price: 3000, current_price: 3000, total_seats: 170, available_seats: 170 },
  { flight_id: "VST304", airline: "Vistara", departure_city: "bangalore", arrival_city: "delhi", departure_time: new Date("2025-12-22T16:00:00Z"), arrival_time: new Date("2025-12-22T18:30:00Z"), duration_minutes: 150, base_price: 2800, current_price: 2800, total_seats: 170, available_seats: 170 },
  { flight_id: "VST305", airline: "Vistara", departure_city: "bangalore", arrival_city: "delhi", departure_time: new Date("2025-12-22T19:00:00Z"), arrival_time: new Date("2025-12-22T21:30:00Z"), duration_minutes: 150, base_price: 2900, current_price: 2900, total_seats: 170, available_seats: 170 },
  { flight_id: "VST306", airline: "Vistara", departure_city: "bangalore", arrival_city: "delhi", departure_time: new Date("2025-12-22T22:00:00Z"), arrival_time: new Date("2025-12-23T00:30:00Z"), duration_minutes: 150, base_price: 3000, current_price: 3000, total_seats: 170, available_seats: 170 },

  // ===== Kolkata ↔ Mumbai =====
  { flight_id: "SP401", airline: "SpiceJet", departure_city: "kolkata", arrival_city: "mumbai", departure_time: new Date("2025-12-22T07:00:00Z"), arrival_time: new Date("2025-12-22T09:00:00Z"), duration_minutes: 120, base_price: 2600, current_price: 2600, total_seats: 160, available_seats: 160 },
  { flight_id: "SP402", airline: "SpiceJet", departure_city: "kolkata", arrival_city: "mumbai", departure_time: new Date("2025-12-22T10:00:00Z"), arrival_time: new Date("2025-12-22T12:00:00Z"), duration_minutes: 120, base_price: 2700, current_price: 2700, total_seats: 160, available_seats: 160 },
  { flight_id: "SP403", airline: "SpiceJet", departure_city: "kolkata", arrival_city: "mumbai", departure_time: new Date("2025-12-22T13:00:00Z"), arrival_time: new Date("2025-12-22T15:00:00Z"), duration_minutes: 120, base_price: 2800, current_price: 2800, total_seats: 160, available_seats: 160 },
  { flight_id: "SP404", airline: "SpiceJet", departure_city: "mumbai", arrival_city: "kolkata", departure_time: new Date("2025-12-22T16:00:00Z"), arrival_time: new Date("2025-12-22T18:00:00Z"), duration_minutes: 120, base_price: 2600, current_price: 2600, total_seats: 160, available_seats: 160 },
  { flight_id: "SP405", airline: "SpiceJet", departure_city: "mumbai", arrival_city: "kolkata", departure_time: new Date("2025-12-22T19:00:00Z"), arrival_time: new Date("2025-12-22T21:00:00Z"), duration_minutes: 120, base_price: 2700, current_price: 2700, total_seats: 160, available_seats: 160 },
  { flight_id: "SP406", airline: "SpiceJet", departure_city: "mumbai", arrival_city: "kolkata", departure_time: new Date("2025-12-22T22:00:00Z"), arrival_time: new Date("2025-12-23T00:00:00Z"), duration_minutes: 120, base_price: 2800, current_price: 2800, total_seats: 160, available_seats: 160 },

  // ===== Delhi ↔ Pune =====
  { flight_id: "AK501", airline: "Akasa Air", departure_city: "delhi", arrival_city: "pune", departure_time: new Date("2025-12-22T06:15:00Z"), arrival_time: new Date("2025-12-22T07:30:00Z"), duration_minutes: 75, base_price: 2300, current_price: 2300, total_seats: 150, available_seats: 150 },
  { flight_id: "AK502", airline: "Akasa Air", departure_city: "delhi", arrival_city: "pune", departure_time: new Date("2025-12-22T09:00:00Z"), arrival_time: new Date("2025-12-22T10:15:00Z"), duration_minutes: 75, base_price: 2400, current_price: 2400, total_seats: 150, available_seats: 150 },
  { flight_id: "AK503", airline: "Akasa Air", departure_city: "delhi", arrival_city: "pune", departure_time: new Date("2025-12-22T12:00:00Z"), arrival_time: new Date("2025-12-22T13:15:00Z"), duration_minutes: 75, base_price: 2500, current_price: 2500, total_seats: 150, available_seats: 150 },
  { flight_id: "AK504", airline: "Akasa Air", departure_city: "pune", arrival_city: "delhi", departure_time: new Date("2025-12-22T14:00:00Z"), arrival_time: new Date("2025-12-22T15:15:00Z"), duration_minutes: 75, base_price: 2300, current_price: 2300, total_seats: 150, available_seats: 150 },
  { flight_id: "AK505", airline: "Akasa Air", departure_city: "pune", arrival_city: "delhi", departure_time: new Date("2025-12-22T16:00:00Z"), arrival_time: new Date("2025-12-22T17:15:00Z"), duration_minutes: 75, base_price: 2400, current_price: 2400, total_seats: 150, available_seats: 150 },
  { flight_id: "AK506", airline: "Akasa Air", departure_city: "pune", arrival_city: "delhi", departure_time: new Date("2025-12-22T18:00:00Z"), arrival_time: new Date("2025-12-22T19:15:00Z"), duration_minutes: 75, base_price: 2500, current_price: 2500, total_seats: 150, available_seats: 150 },
];






const seedFlights = async () => {
    try {
        await connectDB();
        await Flight.deleteMany({});
        const res = await Flight.insertMany(flights);
        console.log('Flight data seeded successfully' , res);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding flight data:', error);
        process.exit(1);
    }
};

seedFlights();

