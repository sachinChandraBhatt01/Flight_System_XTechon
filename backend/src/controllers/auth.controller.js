import { registerSchema, loginSchema } from "../validators/auth.schema.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import User from "../models/User.model.js";


export const register = async (req, res) => {
    try {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid request data", details: parsed.error.errors });
        }
        // console.log("hey")
        const user = await registerUser(parsed.data);
        // console.log(user);

        if (!user) {
            return res.status(400).json({ error: "Registration failed" });
        }
        // console.log(user)
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
        // console.log("hey");
        const { retUser, token } = await loginUser({ email: parsed.data.email, password: parsed.data.password });
        // res.cookie('token', token, {
        //     maxAge: 1000 * 60 * 60 * 24 * 7,
        //     httpOnly: true,
        // });

        res.cookie('token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            httpOnly: true,
            secure: true, // required for HTTPS
            sameSite: 'none', // allow cross-site cookies
            path : "/"
        });

        res.status(200).json({ message: "Login successful", retUser });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// user data
export const myData = async (req, res) => {
    // console.log(req.userId);
    if (!req.userId) {
        throw new Error("User not authorized")
    }
    const resData = await User.findById(req.userId);
    if (!resData) {
        throw new Error("User not fined")
    }
    const { password: _, ...data } = resData._doc;
    // const { password: _, ...user } = newUser._doc;

    return res.status(200).json({ "message": "success", data })
}

export const logout = async (req, res) => {
    res.clearCookie('my_cookie', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
    });
    res.status(200).json({ message: "Logout successful" });
}





