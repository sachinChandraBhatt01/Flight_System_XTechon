import { z } from "zod";

export const flightSchema = z.object({
    from : z.string().min(3, "Origin must be at least 3 characters long"),
    to : z.string().min(3, "Destination must be at least 3 characters long")
});
