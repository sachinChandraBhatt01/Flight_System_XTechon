import { registerSchema , loginSchema } from "../validators/auth.schema.js";
import { registerUser , loginUser } from "../services/auth.service.js";


export const register = async (req, res) => {
    try {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid request data", details: parsed.error.errors });
        }
        console.log("hey")
        const user = await registerUser(parsed.data);
        console.log(user);
        
        if (!user) {
            return res.status(400).json({ error: "Registration failed" });
        }
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid request data", details: parsed.error.errors });
        }
        console.log("hey");
        const {retUser , token} = await loginUser({email : parsed.data.email , password : parsed.data.password });
        res.status(200).json({ message: "Login successful", retUser, token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successful" });
}





