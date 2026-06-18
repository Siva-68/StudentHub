import Admin from "../models/admin.model.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";
/**
 * Register Admin
 */
export const registerAdminService = async (data) => {
    console.log("1. Service Started");

    const { name, email, password } = data;

    console.log("2. Data Destructured");

    const existingAdmin = await Admin.findOne({ email });

    console.log("3. Checked Existing Admin");

    if (existingAdmin) {
        throw new ApiError(409, "Email already exists");
    }

    console.log("4. Before Hash");

    

    console.log("5. Password Hashed");

    try{const admin = await Admin.create({
        name,
        email,
        password
    });

    console.log("6. Admin Created");
    return admin;
    }
    catch(err){
        console.log(`Error while creating admin ${err.message}`);
        
    }
    
};

/**
 * Login Admin
 */
export const loginAdminService = async ({ email, password }) => {
    // Find admin
    const admin = await Admin.findOne({ email });

    if (!admin) {
        throw new ApiError(401, "Invalid email or password");
    }

    // Compare password
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    // Generate token
    const token = generateToken({
        id: admin._id,
        role: admin.role,
    });

    const adminData = admin.toObject();
    delete adminData.password;

    return {
        admin: adminData,
        token
    };
};