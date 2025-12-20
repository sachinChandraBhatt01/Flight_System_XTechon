import connectDB from "../config/db.js";
import Flight from "../models/Flight.model.js";

const flights = [
  {
    flight_id: "AI101",
    airline: "Air India",
    departure_city: "delhi",
    arrival_city: "mumbai",
    base_price: 2500,
    current_price: 2700,
  },
  {
    flight_id: "AI102",
    airline: "Air India",
    departure_city: "mumbai",
    arrival_city: "delhi",
    base_price: 2400,
    current_price: 2600,
  },
  {
    flight_id: "IND201",
    airline: "IndiGo",
    departure_city: "bangalore",
    arrival_city: "chennai",
    base_price: 2200,
    current_price: 2300,
  },
  {
    flight_id: "IND202",
    airline: "IndiGo",
    departure_city: "chennai",
    arrival_city: "bangalore",
    base_price: 2250,
    current_price: 2400,
  },
  {
    flight_id: "VST301",
    airline: "Vistara",
    departure_city: "delhi",
    arrival_city: "kolkata",
    base_price: 2600,
    current_price: 2850,
  },
  {
    flight_id: "VST302",
    airline: "Vistara",
    departure_city: "kolkata",
    arrival_city: "delhi",
    base_price: 2550,
    current_price: 2750,
  },
  {
    flight_id: "SP401",
    airline: "SpiceJet",
    departure_city: "delhi",
    arrival_city: "jaipur",
    base_price: 2000,
    current_price: 2150,
  },
  {
    flight_id: "SP402",
    airline: "SpiceJet",
    departure_city: "jaipur",
    arrival_city: "delhi",
    base_price: 2050,
    current_price: 2200,
  },
  {
    flight_id: "AK501",
    airline: "Akasa Air",
    departure_city: "mumbai",
    arrival_city: "pune",
    base_price: 2000,
    current_price: 2100,
  },
  {
    flight_id: "AK502",
    airline: "Akasa Air",
    departure_city: "pune",
    arrival_city: "mumbai",
    base_price: 2000,
    current_price: 2050,
  },
  {
    flight_id: "IND203",
    airline: "IndiGo",
    departure_city: "hyderabad",
    arrival_city: "bangalore",
    base_price: 2300,
    current_price: 2450,
  },
  {
    flight_id: "IND204",
    airline: "IndiGo",
    departure_city: "bangalore",
    arrival_city: "hyderabad",
    base_price: 2350,
    current_price: 2500,
  },
  {
    flight_id: "AI103",
    airline: "Air India",
    departure_city: "delhi",
    arrival_city: "amritsar",
    base_price: 2100,
    current_price: 2250,
  },
  {
    flight_id: "AI104",
    airline: "Air India",
    departure_city: "amritsar",
    arrival_city: "delhi",
    base_price: 2150,
    current_price: 2300,
  },
  {
    flight_id: "VST303",
    airline: "Vistara",
    departure_city: "mumbai",
    arrival_city: "goa",
    base_price: 2700,
    current_price: 2900,
  },
  {
    flight_id: "VST304",
    airline: "Vistara",
    departure_city: "goa",
    arrival_city: "mumbai",
    base_price: 2650,
    current_price: 2850,
  },
  {
    flight_id: "SP403",
    airline: "SpiceJet",
    departure_city: "delhi",
    arrival_city: "lucknow",
    base_price: 2200,
    current_price: 2350,
  },
  {
    flight_id: "SP404",
    airline: "SpiceJet",
    departure_city: "lucknow",
    arrival_city: "delhi",
    base_price: 2250,
    current_price: 2400,
  },
  {
    flight_id: "AK503",
    airline: "Akasa Air",
    departure_city: "ahmedabad",
    arrival_city: "mumbai",
    base_price: 2400,
    current_price: 2550,
  },
  {
    flight_id: "AK504",
    airline: "Akasa Air",
    departure_city: "mumbai",
    arrival_city: "ahmedabad",
    base_price: 2450,
    current_price: 2600,
  }
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

