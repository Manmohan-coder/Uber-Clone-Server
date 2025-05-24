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
        const captain = await createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password,
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