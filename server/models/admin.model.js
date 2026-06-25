import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        default: "admin"
    }
}, { timestamps: true });

/**
 * Hash password before saving
 */
adminSchema.pre("save", async function (next) {
    try {
        console.log("444");
        
        if (!this.isModified("password")) return next();
        console.log("888");
        
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log("999");
        
        next();
    } catch (error) {
        next(error);
    }
});

/**
 * Compare password
 */
adminSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;