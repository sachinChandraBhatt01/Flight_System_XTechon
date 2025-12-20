import mongoose , {Schema} from "mongoose";


const bookingAttemptSchema = new Schema({
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
    attemptedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
}, {timestamps: true});

export default mongoose.model("BookingAttempt", bookingAttemptSchema);
