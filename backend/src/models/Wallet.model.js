import mongoose , {Schema} from "mongoose";
import { WALLET_DEFAULT_BALANCE } from "../utils/constants.js";

const walletSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: WALLET_DEFAULT_BALANCE
    },
}, {timestamps: true});

export default mongoose.model("Wallet", walletSchema);

