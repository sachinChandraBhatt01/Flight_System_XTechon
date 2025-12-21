import BookingAttempt from "../models/BookingAttempt.model.js";
import Flight from "../models/Flight.model.js";

import {
    SURGE_PRECENTAGE,
    SURGE_ATTEMPT_LIMIT,
    SURGE_TIME_WINDOW_MIN,
    SURGE_RESET_MIN
} from "../utils/constants.js";


export const applyDynamicPricing = async (userId , flightId) =>{
    const now = new Date();

    // record booking attempt 
    await BookingAttempt.create({
        userId,
        flightId,
        attemptedAt : now
    })

    // time windows
    const surgeWindowStart = new Date(
        now.getTime() - SURGE_TIME_WINDOW_MIN * 60 * 1000
    );

    const resetWindowStart = new Date(
        now.getTime() - SURGE_RESET_MIN * 60 * 1000
    );

    // count attempts in surge window
    const attempts = await BookingAttempt.countDocuments({
        userId,
        flightId,
        attemptedAt : {
            $gte : surgeWindowStart
        },
    });

    const flight = await Flight.findById(flightId);
    const recentAttempts = await BookingAttempt.countDocuments({
        userId,
        flightId,
        attemptedAt : {
            $gte : resetWindowStart,
        }
    });


    if (recentAttempts === 0) {
        flight.current_price = flight.base_price;
        await flight.save();
        return flight.current_price;
    }

    if (attempts >- SURGE_ATTEMPT_LIMIT) {
        flight.current_price = Math.round(flight.base_price * (1 * SURGE_PRECENTAGE));
        await flight.save();
    }

    return flight.current_price;
}
