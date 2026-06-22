import Admin from "../models/admin.model.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

/**
 * Register Admin Service
 */
export const registerAdminService = async (data) => {
    console.log("000");
    
    const { name, email, password } = data;
    console.log("111");
    
    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }
    console.log("222");
    // Check for existing admin
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        throw new ApiError(409, "An account with this email already exists");
    }
    console.log("333");
    // Admin model pre-save hook handles bcrypt hashing
    const admin = await Admin.create({ name, email, password });
    console.log("555");
    const adminData = admin.toObject();
    delete adminData.password;
    console.log("666");
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