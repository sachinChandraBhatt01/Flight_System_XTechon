import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import Wallet from '../models/Wallet.model.js';


const registerUser = async (userData) => {
    const { username, email, password } = userData;
    const existingUser = await User.findOne({email});
    if (existingUser) {
        throw new Error('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    const { password: _, ...user } = newUser._doc;

    // auto create wallet for new user
    await Wallet.create({userId: newUser._id});
    return user;
};

const loginUser = async ({email, password}) => {
    // console.log("get data" , email , password);
    const user = await User.findOne({email});
    // console.log(user);
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }
    // console.log(isPasswordValid);
    
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    // console.log(token);

    const {password : _ , ...retUser} = user._doc 
    // console.log(retUser);
    
    return {retUser, token};
};

export {registerUser, loginUser};

