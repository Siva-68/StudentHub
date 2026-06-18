import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    registerAdminService,
    loginAdminService,
} from "../services/auth.service.js";

/**
 * Register Admin
 */
export const registerAdmin = asyncHandler(async (req, res, next) => {
   console.log("siva");
   
    const result = await registerAdminService(req.body);
    console.log("1234");
    
    res.status(201).json(
        new ApiResponse(201, "Admin registered successfully", result)
    );
});


/**
 * Login Admin
 */
export const loginAdmin = asyncHandler(async (req, res,next) => {

    const result = await loginAdminService(req.body);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Login successful",
                result
            )
        );
});