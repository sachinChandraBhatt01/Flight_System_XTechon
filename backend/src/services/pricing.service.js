import BookingAttempt from "../models/BookingAttempt.model.js";
import Flight from "../models/Flight.model.js";

import {
    SURGE_PRECENTAGE,
    SURGE_ATTEMPT_LIMIT,
    SURGE_TIME_WINDOW_MIN,
    SURGE_RESET_MIN
} from "../utils/constants.js";


export const applyDynamicPricing = async (userId, flightId) => {
  const now = new Date();

  const surgeWindowStart = new Date(
    now.getTime() - SURGE_TIME_WINDOW_MIN * 60 * 1000
  );

  const resetWindowStart = new Date(
    now.getTime() - SURGE_RESET_MIN * 60 * 1000
  );

  const flight = await Flight.findById(flightId);
  if (!flight) throw new Error("Flight not found");

  // 🔹 Count attempts in last 5 min (for surge)
  const surgeAttempts = await BookingAttempt.countDocuments({
    userId,
    flightId,
    attemptedAt: { $gte: surgeWindowStart },
  });

  // 🔹 Count attempts in last 10 min (for reset)
  const recentAttempts = await BookingAttempt.countDocuments({
    userId,
    flightId,
    attemptedAt: { $gte: resetWindowStart },
  });

  /**
   * RESET LOGIC
   * Agar 10 min mein koi attempt nahi hua
   */
  if (recentAttempts === 0) {
    flight.current_price = flight.base_price;
  }

  /**
   * SURGE LOGIC
   * 5 min mein 3 attempts ke baad
   */
  else if (surgeAttempts >= SURGE_ATTEMPT_LIMIT) {
    flight.current_price = Math.round(
      flight.base_price * (1 + SURGE_PRECENTAGE)
    );
  }

  await flight.save();

  // 🔹 Record current attempt AFTER pricing logic
  await BookingAttempt.create({
    userId,
    flightId,
    attemptedAt: now,
  });

  return flight.current_price;
};

