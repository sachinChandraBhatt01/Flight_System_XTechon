import mongoose, { Schema } from 'mongoose';

const flightSchema = new Schema(
  {
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
      lowercase: true,
    },
    arrival_city: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    departure_time: {
      type: Date,
      required: true,
    },
    arrival_time: {
      type: Date,
      required: true,
    },
    duration_minutes: {
      type: Number, // flight duration in minutes
      required: true,
      min: 30,
    },
    base_price: {
      type: Number,
      required: true,
      min: 2000,
      max: 3000,
    },
    current_price: {
      type: Number,
      required: true,
    },
    total_seats: {
      type: Number,
      required: true,
      min: 1,
    },
    available_seats: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Flight', flightSchema);
