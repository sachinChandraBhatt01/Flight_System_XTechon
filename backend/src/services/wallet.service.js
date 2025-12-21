import Wallet from "../models/Wallet.model.js";

export const getWalletByUser = async (userId) => {
    const wallet = await Wallet.findOne({userId});
    if (!wallet) {
        throw new Error("wallet not found")
    }
    return wallet;
}

export const deductedFromWallet = async (userId , amount) =>{
    const wallet = await Wallet.findOne({userId});
    if (wallet.balance < amount) {
        throw new Error("Insufficient wallet balance");
    }
    wallet.balance -= amount;
    await wallet.save();

    return wallet.balance();
}
