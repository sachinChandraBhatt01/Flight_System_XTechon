import {z} from "zod"

export const bookingSchema = z.object({
    flightId : z.string(),
    passengerName : z.string().min(3)
})
