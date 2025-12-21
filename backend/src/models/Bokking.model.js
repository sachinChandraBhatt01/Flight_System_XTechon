import mongoose , {Schema} from "mongoose";

const bookingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flight",
        required: true,
    },
    passengerName: {
        type: String,
        required: true,
        trim: true,
    },
    price_paid: {
        type: Number,
        required: true,
    },
    pnr: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    ticket_path: {
        type: String,
        trim: true,
    },
}, {timestamps: true});

export default mongoose.model("Booking", bookingSchema);
