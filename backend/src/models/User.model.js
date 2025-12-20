import mongoose , {Schema} from "mongoose";
import { use } from "react";
import { email, lowercase, trim } from "zod";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
}, {timestamps: true});

export default mongoose.model("User", userSchema);
