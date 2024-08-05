import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    const {name, email, password, team} = req.body;

    if (!name || !email || !password || email === '' || password === '' || team === '') {
        return next(errorHandler(400, "Name, email, password and team are required"));
    };

    try {
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return next(errorHandler(400, "Email already exists"));
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await User.create({ name, email, password: hashedPassword, team });

        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        });
    } catch (error) {
        return next(errorHandler(error.code || 500, error.message || "Internal server error"));
    }
};


export const login = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, "Email and password are required"));
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return next(errorHandler(400, "User does not exist"));
        }

        const passwordMatch = await bcryptjs.compareSync(password, existingUser.password);

        if (!passwordMatch) {
            return next(errorHandler(400, "Invalid credentials"));
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const { password: userPassword, ...rest } = existingUser._doc;

        res
            .status(200)
            .cookie('access_token', token, { httpOnly: true })
            .json({
                message: "User signed in successfully",
                user: rest
            });

        if (!passwordMatch) {
            return next(errorHandler(400, "Invalid password"));
        }
    } catch (error) {
        return next(errorHandler(error.code || 500, error.message || "Internal server error"));
    }
}

export const logout = async (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json({
            message: "User signed out successfully"
        });
    } catch (error) {
        return next(errorHandler(error.code || 500, error.message || "Internal server error"));
    }
}