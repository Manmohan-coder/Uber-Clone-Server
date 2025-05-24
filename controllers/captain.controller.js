import blacklistTokenModel from "../models/blacklistToken.Model.js";
import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";

export const registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { fullname, email, password, vehicle } = req.body;

        // Check if the email already exists
        const existingCaptain = await captainModel.findOne({ email });
        
        if (existingCaptain) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await captainModel.hashPassword(password);
        const captain = await createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });
        const token = captain.generateAuthToken();
        // res.cookie("token", token);
        return res.status(201).json({
            message: "Captain registered successfully",
            token: token,
            captain: {
                id: captain._id,
                fullname: captain.fullname,
                email: captain.email,
                vehicle: captain.vehicle
            }
        });
    } catch (error) {
        next(error);
    }
}

export const loginCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        const captain = await captainModel.findOne({ email }).select('+password');
        
        if (!captain) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        
        const isMatch = await captain.comparePassword(password);
        console.log(isMatch);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = captain.generateAuthToken();
        res.cookie("token", token);
        return res.status(200).json({
            message: "Captain logged in successfully",
            token: token,
            captain: {
                id: captain._id,
                fullname: captain.fullname,
                email: captain.email,
                password: captain.password,
                vehicle: captain.vehicle
            }
        });
    } catch (error) {
        next(error);
    }
}

export const getCaptainProfile = async (req, res, next) => {
    try {
        const captain = await captainModel.findById(req.captain._id).select('-password');
        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }
        return res.status(200).json({
            message: "Captain profile retrieved successfully",
            captain
        });
    } catch (error) {
        next(error);
    }
}

export const logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Add the token to the blacklist
        await blacklistTokenModel.create({ token });
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
}