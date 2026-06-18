import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * AUTH MIDDLEWARE
 * ----------------
 * This middleware protects routes by verifying JWT token.
 * It ensures only authenticated users can access protected APIs.
 */

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. CHECK IF TOKEN EXISTS IN HEADERS
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    console.log(token);
    
    // 2. CHECK IF TOKEN EXISTS
    if (!token) {
        throw new ApiError(401, "Not authorized, token missing");
    }

    try {
        // 3. VERIFY TOKEN
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. FETCH USER FROM DATABASE (SECURITY CHECK)
        const admin = await Admin.findById(decoded.id).select("-password");

        if (!admin) {
            throw new ApiError(401, "User not found");
        }

        // 5. ATTACH USER TO REQUEST
        req.user = admin;

        next();
    } catch (error) {
        throw new ApiError(401, "Not authorized, token failed");
    }
});