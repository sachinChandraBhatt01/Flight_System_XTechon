import { getWalletByUser } from "../services/wallet.service.js";


export const getWallet = async (req ,res)=>{
    try {
        const wallet = await getWalletByUser(req.userId);
        return res.json({
            balance : wallet.balance
        })
    } catch (error) {
        return res.status(400).json({error : error.message})
    }
}


