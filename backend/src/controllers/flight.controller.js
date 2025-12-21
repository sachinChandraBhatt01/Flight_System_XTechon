import Flight from "../models/Flight.model.js";
import { flightSchema } from "../validators/flight.schema.js";
import {FLIGHT_RESULT_LIMIT} from "../utils/constants.js";


export const searchFlights = async (req, res) => {
    try {
        const parsed = flightSchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid query parameters", details: parsed.error.errors });
        }
        const {from : departure_city , to : arrival_city} = parsed.data;
        console.log(`Searching flights from ${departure_city.toLowerCase()} to ${arrival_city}`);
        const flights = await Flight.find({
            departure_city: departure_city.toLowerCase(),
            arrival_city: arrival_city.toLowerCase()
        }).limit(FLIGHT_RESULT_LIMIT);
        console.log("Flights found:", flights);
        if (flights.length === 0) {
            return res.status(404).json({ message: "No flights found for the given route" });
        }
        return res.status(200).json(flights);
    } catch (error) {
        console.error("Error searching flights:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

