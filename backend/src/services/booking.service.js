import Flight from "../models/Flight.model.js";
import Booking from "../models/Bokking.model.js";
import { applyDynamicPricing } from "./pricing.service.js";
import { deductedFromWallet } from "./wallet.service.js";
import { generateTicketPdf } from "../utils/pdf.js";
import BookingAttemptModel from "../models/BookingAttempt.model.js";


const generatePNR = () =>{
    return `PNR ${Date.now()} ${Math.floor(Math.random() * 1000)}`
}

export const bookFlight = async (userId , flightId , passengerName) =>{
    const fllight = await Flight.findById(flightId);
    if(!fllight) throw new Error("Flight Not Found");
    // console.log(fllight)
    // apply surge pricing
    const finalPrice = await applyDynamicPricing(userId , flightId);

    // deduct wallet 
    await deductedFromWallet(userId , finalPrice);
    
    // create booking
    const pnr = generatePNR();
    console.log(pnr);
    const booking = await Booking.create({
        userId,
        flightId,
        passengerName,
        price_paid : finalPrice,
        pnr
    })
    console.log(pnr)
    console.log(fllight)
    // generate pdf
    const pdfPath = await generateTicketPdf({
        passengerName,
        airline : fllight.airline,
        flightId : fllight.flight_id,
        route : `${fllight.departure_city} - ${fllight.arrival_city}`,
        price : finalPrice,
        pnr,
        date : new Date().toLocaleString(),
    })
    console.log(pdfPath)
    if(!pdfPath){
        throw new Error("pdf path cannot set");
    }

    booking.ticket_path = pdfPath;

    return booking;

}
