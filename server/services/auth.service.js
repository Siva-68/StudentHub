import Admin from "../models/admin.model.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

/**
 * Register Admin Service
 */
export const registerAdminService = async (data) => {
    const { name, email, password } = data;

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Check for existing admin
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        throw new ApiError(409, "An account with this email already exists");
    }

    // Admin model pre-save hook handles bcrypt hashing
    const admin = await Admin.create({ name, email, password });

    const adminData = admin.toObject();
    delete adminData.password;

    return adminData;
};

/**
 * Login Admin Service
 */
export const loginAdminService = async ({ email, password }) => {
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
        throw new ApiError(401, "Invalid email or password");
    }

    // Compare hashed password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    // Generate JWT
    const token = generateToken({
        id:   admin._id,
        role: admin.role,
    });

    const adminData = admin.toObject();
    delete adminData.password;

    return { admin: adminData, token };
};