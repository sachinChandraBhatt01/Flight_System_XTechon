import BookingAttempt from "../models/BookingAttempt.model.js";
import Flight from "../models/Flight.model.js";

import {
  SURGE_PRECENTAGE,
  SURGE_ATTEMPT_LIMIT,
  SURGE_TIME_WINDOW_MIN,
  SURGE_RESET_MIN
} from "../utils/constants.js";

export const applyDynamicPricing = async (flightId) => {
  const now = new Date();

  const surgeWindow = new Date(
    now.getTime() - SURGE_TIME_WINDOW_MIN * 60 * 1000
  );

  const resetWindow = new Date(
    now.getTime() - SURGE_RESET_MIN * 60 * 1000
  );

  const flight = await Flight.findById(flightId);
  if (!flight) {
    throw new Error("Flight not found");
  }

  const lastAttempt = await BookingAttempt.findOne({ flightId })
    .sort({ attemptedAt: -1 });

  // 🔁 RESET
  if (!lastAttempt || lastAttempt.attemptedAt < resetWindow) {
    if (flight.current_price !== flight.base_price) {
      flight.current_price = flight.base_price;
      await flight.save();
    }
    return flight.current_price; // ✅ ALWAYS RETURN
  }

  const recentAttempts = await BookingAttempt.countDocuments({
    flightId,
    attemptedAt: { $gte: surgeWindow },
  });

  // 🚀 SURGE
  if (recentAttempts >= SURGE_ATTEMPT_LIMIT) {
    const surgedPrice = Math.round(
      flight.base_price * (1 + SURGE_PRECENTAGE)
    );

    if (flight.current_price !== surgedPrice) {
      flight.current_price = surgedPrice;
      await flight.save();
    }
  }

  // ✅ DEFAULT RETURN
  return flight.current_price;
};




