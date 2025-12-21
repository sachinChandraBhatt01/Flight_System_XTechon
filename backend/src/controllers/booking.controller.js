import { bookingSchema } from "../validators/booking.schema.js";
import { bookFlight, getUserBookings } from "../services/booking.service.js";
import fs from "fs"
import Booking from "../models/Bokking.model.js";


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

export const getBookings = async (req , res) =>{
    try {
        const booking = await getUserBookings(req.userId)
        console.log(booking)
        const data = booking.map((b)=>(
            {
                booking_id : b._id,
                flight_id : b.flightId.flight_Id,
                airline : b.flightId.airline,
                route : `${b.flightId.departure_city} - ${b.flightId.arrival_city}`,
                pnr : b.pnr,
                ticket_path : b.ticket_path
            }
        ))
        return res.status(201).json({"message":"success" , data})
    } catch (error) {
        return res.status(400).json({error : error.message})
    }
}


export const downloadTicket = async (req , res) =>{
    try {
        const pnr = req.params.pnr
        const booking = await Booking.findOne({
            pnr : pnr,
            userId : req.userId
        })
        console.log(booking.ticket_path)
        if(!booking || !booking.ticket_path){
            return res.status(404).json({error : "ticket not found"})
        }
    
        return res.status(200).download(booking.ticket_path) 
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}



