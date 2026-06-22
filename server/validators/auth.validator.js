import ApiError from "../utils/ApiError.js";

const emailRegex = /^\S+@\S+\.\S+$/;

export const validateRegister = (req, res, next) => {
    console.log('1');
    
    const { name, email, password } = req.body;

    if (!name) return next(new ApiError(400, "Name required"));
    if (!emailRegex.test(email)) return next(new ApiError(400, "Invalid email"));
    if (!password) return next(new ApiError(400, "Password required"));

    next();
    console.log('2');
    
};

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email) return next(new ApiError(400, "Email required"));
    if (!password) return next(new ApiError(400, "Password required"));

    next();
};