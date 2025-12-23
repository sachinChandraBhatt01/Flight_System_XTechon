import Flight from "../models/Flight.model.js";
import { flightSchema } from "../validators/flight.schema.js";

import { applyDynamicPricing } from "../services/pricing.service.js";

export const searchFlights = async (req, res) => {
  try {
    const { from, to } = req.query;
    console.log(from , to);
    const flights = await Flight.find({
      departure_city: from.toLowerCase(),
      arrival_city: to.toLowerCase(),
    });

    // 🔥 PRICE UPDATE ON SEARCH
    for (let flight of flights) {
      await applyDynamicPricing(flight._id);
    }

    const updatedFlights = await Flight.find({
      departure_city: from.toLowerCase(),
      arrival_city: to.toLowerCase(),
    });
    console.log(flights);
    console.log(updatedFlights);
    return res.status(200).json(updatedFlights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search flights" });
  }
};



export const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();

    for (const flight of flights) {
      await applyDynamicPricing(
        flight._id,
      );
    }

    const updatedFlights = await Flight.find();
    return res.status(200).json(updatedFlights);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

