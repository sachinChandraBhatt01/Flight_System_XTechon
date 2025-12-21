import connectDB from "../config/db.js";
import Flight from "../models/Flight.model.js";

const flights = [
  // ===== Air India =====
  { flight_id: "AI101", airline: "Air India", departure_city: "delhi", arrival_city: "mumbai", base_price: 2500, current_price: 2500 },
  { flight_id: "AI102", airline: "Air India", departure_city: "mumbai", arrival_city: "delhi", base_price: 2500, current_price: 2500 },
  { flight_id: "AI103", airline: "Air India", departure_city: "delhi", arrival_city: "kolkata", base_price: 2700, current_price: 2700 },
  { flight_id: "AI104", airline: "Air India", departure_city: "kolkata", arrival_city: "delhi", base_price: 2700, current_price: 2700 },
  { flight_id: "AI105", airline: "Air India", departure_city: "delhi", arrival_city: "amritsar", base_price: 2200, current_price: 2200 },
  { flight_id: "AI106", airline: "Air India", departure_city: "amritsar", arrival_city: "delhi", base_price: 2200, current_price: 2200 },

  // ===== IndiGo =====
  { flight_id: "IND201", airline: "IndiGo", departure_city: "bangalore", arrival_city: "chennai", base_price: 2200, current_price: 2200 },
  { flight_id: "IND202", airline: "IndiGo", departure_city: "chennai", arrival_city: "bangalore", base_price: 2200, current_price: 2200 },
  { flight_id: "IND203", airline: "IndiGo", departure_city: "hyderabad", arrival_city: "bangalore", base_price: 2300, current_price: 2300 },
  { flight_id: "IND204", airline: "IndiGo", departure_city: "bangalore", arrival_city: "hyderabad", base_price: 2300, current_price: 2300 },
  { flight_id: "IND205", airline: "IndiGo", departure_city: "mumbai", arrival_city: "goa", base_price: 2600, current_price: 2600 },
  { flight_id: "IND206", airline: "IndiGo", departure_city: "goa", arrival_city: "mumbai", base_price: 2600, current_price: 2600 },

  // ===== Vistara =====
  { flight_id: "VST301", airline: "Vistara", departure_city: "delhi", arrival_city: "bangalore", base_price: 2900, current_price: 2900 },
  { flight_id: "VST302", airline: "Vistara", departure_city: "bangalore", arrival_city: "delhi", base_price: 2900, current_price: 2900 },
  { flight_id: "VST303", airline: "Vistara", departure_city: "mumbai", arrival_city: "kolkata", base_price: 3000, current_price: 3000 },
  { flight_id: "VST304", airline: "Vistara", departure_city: "kolkata", arrival_city: "mumbai", base_price: 3000, current_price: 3000 },
  { flight_id: "VST305", airline: "Vistara", departure_city: "mumbai", arrival_city: "goa", base_price: 2700, current_price: 2700 },
  { flight_id: "VST306", airline: "Vistara", departure_city: "goa", arrival_city: "mumbai", base_price: 2700, current_price: 2700 },

  // ===== SpiceJet =====
  { flight_id: "SP401", airline: "SpiceJet", departure_city: "delhi", arrival_city: "jaipur", base_price: 2000, current_price: 2000 },
  { flight_id: "SP402", airline: "SpiceJet", departure_city: "jaipur", arrival_city: "delhi", base_price: 2000, current_price: 2000 },
  { flight_id: "SP403", airline: "SpiceJet", departure_city: "delhi", arrival_city: "lucknow", base_price: 2100, current_price: 2100 },
  { flight_id: "SP404", airline: "SpiceJet", departure_city: "lucknow", arrival_city: "delhi", base_price: 2100, current_price: 2100 },
  { flight_id: "SP405", airline: "SpiceJet", departure_city: "mumbai", arrival_city: "nagpur", base_price: 2300, current_price: 2300 },
  { flight_id: "SP406", airline: "SpiceJet", departure_city: "nagpur", arrival_city: "mumbai", base_price: 2300, current_price: 2300 },

  // ===== Akasa Air =====
  { flight_id: "AK501", airline: "Akasa Air", departure_city: "mumbai", arrival_city: "pune", base_price: 2000, current_price: 2000 },
  { flight_id: "AK502", airline: "Akasa Air", departure_city: "pune", arrival_city: "mumbai", base_price: 2000, current_price: 2000 },
  { flight_id: "AK503", airline: "Akasa Air", departure_city: "ahmedabad", arrival_city: "mumbai", base_price: 2400, current_price: 2400 },
  { flight_id: "AK504", airline: "Akasa Air", departure_city: "mumbai", arrival_city: "ahmedabad", base_price: 2400, current_price: 2400 },
  { flight_id: "AK505", airline: "Akasa Air", departure_city: "bangalore", arrival_city: "kochi", base_price: 2500, current_price: 2500 },
  { flight_id: "AK506", airline: "Akasa Air", departure_city: "kochi", arrival_city: "bangalore", base_price: 2500, current_price: 2500 },

  // ===== Extra Domestic Routes =====
  { flight_id: "EX601", airline: "IndiGo", departure_city: "delhi", arrival_city: "patna", base_price: 2300, current_price: 2300 },
  { flight_id: "EX602", airline: "IndiGo", departure_city: "patna", arrival_city: "delhi", base_price: 2300, current_price: 2300 },
  { flight_id: "EX603", airline: "Air India", departure_city: "delhi", arrival_city: "bhopal", base_price: 2200, current_price: 2200 },
  { flight_id: "EX604", airline: "Air India", departure_city: "bhopal", arrival_city: "delhi", base_price: 2200, current_price: 2200 },
  { flight_id: "EX605", airline: "SpiceJet", departure_city: "indore", arrival_city: "mumbai", base_price: 2400, current_price: 2400 },
  { flight_id: "EX606", airline: "SpiceJet", departure_city: "mumbai", arrival_city: "indore", base_price: 2400, current_price: 2400 },
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

