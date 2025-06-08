import userModel from "../models/user.model.js";
import blacklistTokenModel from "../models/blacklistToken.Model.js";
import jwt from "jsonwebtoken";
import captainModel from "../models/captain.model.js";

export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Check if the token is blacklisted
        const blacklistedToken = await blacklistTokenModel.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export const authCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Check if the token is blacklisted
        const blacklistedToken = await blacklistTokenModel.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}