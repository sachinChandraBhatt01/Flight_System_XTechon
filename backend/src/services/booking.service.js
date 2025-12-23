import Flight from "../models/Flight.model.js";
import Booking from "../models/Bokking.model.js";
import { applyDynamicPricing } from "./pricing.service.js";
import { deductedFromWallet } from "./wallet.service.js";
import { generateTicketPdf } from "../utils/pdf.js";
import BookingAttempt from "../models/BookingAttempt.model.js";


const generatePNR = () => {
    return `PNR${Date.now()}${Math.floor(Math.random() * 1000)}`
}

export const bookFlight = async (userId, flightId, passengerName) => {
    const fllight = await Flight.findById(flightId);
    if (!fllight) throw new Error("Flight Not Found");
    // console.log(fllight)
    // apply surge pricing
    await BookingAttempt.create({
        userId,
        flightId,
    });
    // console.log("hey", flightId)

    // console.log("hey");
    const pnr = generatePNR();
    // console.log("pnr", pnr);
    const booking = await Booking.create({
        userId,
        flightId,
        passengerName,
        price_paid: fllight.current_price,
        pnr
    })

    // deduct wallet 
    await deductedFromWallet(userId, fllight.current_price);

    // create booking

    const finalPrice = await applyDynamicPricing(flightId);
    // console.log(finalPrice);
    // console.log(pnr)
    // console.log(fllight)
    // generate pdf
    const pdfPath = await generateTicketPdf({
        passengerName,
        airline: fllight.airline,
        flightId: fllight.flight_id,
        route: `${fllight.departure_city} - ${fllight.arrival_city}`,
        price: fllight.current_price,
        pnr,
        date: new Date().toLocaleString(),
    })
    // console.log(pdfPath)
    if (!pdfPath) {
        throw new Error("pdf path cannot set");
    }

    booking.ticket_path = pdfPath;
    booking.save();

    return booking;

}

export const getUserBookings = async (userId) => {
    const bookings = await Booking.find({ userId }).populate("flightId").sort({ createdAt: -1 })

    return bookings;

}