import userModel from "../models/user.model.js";
import {createUser} from "../services/user.service.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { fullname, email, password } = req.body;
        const hashedPassword = await userModel.hashPassword(password);
        const user = await createUser({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
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

