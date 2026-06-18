import mongoose from "mongoose";

/**
 * STUDENT SCHEMA
 * --------------
 * Defines structure for student records in StudentHub system.
 * Includes validation, indexing, and timestamps.
 */

const studentSchema = new mongoose.Schema(
    {
        // =========================
        // PERSONAL INFORMATION
        // =========================

        name: {
            type: String,
            required: [true, "Student name is required"],
            trim: true,
            minlength: [3, "Name must be at least 3 characters"],
            maxlength: [50, "Name cannot exceed 50 characters"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email"
            ]
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            match: [/^[0-9]{10}$/, "Phone must be 10 digits"]
        },

        // =========================
        // ACADEMIC INFORMATION
        // =========================

        course: {
            type: String,
            required: [true, "Course is required"],
            enum: ["BCA", "BSC", "MCA", "MSC", "ENGINEERING", "OTHER"]
        },

        year: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        },

        // =========================
        // MEDIA INFORMATION
        // =========================

        profileImage: {
            type: String,
            default: ""
        },

        // =========================
        // SYSTEM INFORMATION
        // =========================

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin"
        }
    },
    {
        timestamps: true
    }
);

/**
 * INDEXES (for performance)
 * Improves search speed for large datasets
 */

studentSchema.index({ name: "text" });

const Student = mongoose.model("Student", studentSchema);

export default Student;