import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
    registerAdminService,
    loginAdminService,
} from "../services/auth.service.js";

/**
 * POST /api/auth/register
 */
export const registerAdmin = asyncHandler(async (req, res) => {
    console.log("123");
    
    const result = await registerAdminService(req.body);
    console.log("345");
    return res.status(201).json(
        new ApiResponse(201, "Admin registered successfully", result)
    );
});

/**
 * POST /api/auth/login
 */
export const loginAdmin = asyncHandler(async (req, res) => {
    const result = await loginAdminService(req.body);

    return res.status(200).json(
        new ApiResponse(200, "Login successful", result)
    );
});