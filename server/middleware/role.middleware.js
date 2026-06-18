import ApiError from "../utils/ApiError.js";

/**
 * ROLE MIDDLEWARE
 * ----------------
 * This middleware checks if the logged-in user
 * has permission to access the route.
 *
 * It runs AFTER authentication middleware.
 */

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        
        // 1. CHECK IF USER EXISTS (must come from protect middleware)
        if (!req.user) {
            throw new ApiError(401, "User not authenticated");
        }

        // 2. CHECK USER ROLE
        const userRole = req.user.role;

        // 3. CHECK IF ROLE IS ALLOWED
        if (!allowedRoles.includes(userRole)) {
            throw new ApiError(
                403,
                `Role (${userRole}) is not allowed to access this resource`
            );
        }

        next();
    };
};