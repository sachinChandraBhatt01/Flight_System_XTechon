import { bookingSchema } from "../validators/booking.schema.js";
import { bookFlight } from "../services/booking.service.js";

export const book = async (req, res) => {
    try {
        const parsed = bookingSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                error: parsed.error.errors
            })
        }
        const booking = await bookFlight(req.userId, parsed.data.flightId, parsed.data.passengerName)

        return res.status(201).json({
            message  : "booking successful" , booking,
        })


    } catch (error) {
        return res.status(400).json({error : error.message})
    }
}



