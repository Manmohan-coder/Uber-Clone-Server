import userModel from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.Model.js";

export const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { fullname, email, password } = req.body;
        const hashedPassword = await userModel.hashPassword(password);
        const user = await createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });

        const token = user.generateAuthToken();

        return res.status(201).json({
            message: "User registered successfully",
            token: token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            },

        });
    } catch (error) {
        next(error);
    }

}

export const loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = user.generateAuthToken();

        res.cookie("token", token);
        

        return res.status(200).json({
            message: "User logged in successfully",
            token: token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            },

        });
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        return res.status(200).json({
            message: "User retrieved successfully",
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (error) {
        next(error);
    }
}

export const logoutUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        await blacklistTokenModel.create({ token });
        res.clearCookie("token");
        return res.status(200).json({
            message: "User logged out successfully",
        });
    } catch (error) {
        next(error);
    }
}