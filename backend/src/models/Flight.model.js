import mongoose , {Schema} from 'mongoose';

const flightSchema = new Schema({
    flight_id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    airline: {
        type: String,
        required: true,
        trim: true,
    },
    departure_city: {
        type: String,
        required: true,
        trim: true,
        tolowercase: true,
    },
    arrival_city: {
        type: String,
        required: true,
        trim: true,
        tolowercase: true,
    },
    base_price: {
        type: Number,
        required: true,
        min : 2000,
        max : 3000
    },
    current_price: {
        type: Number,
        required: true,
    }
}, {timestamps: true});

export default mongoose.model('Flight', flightSchema);

