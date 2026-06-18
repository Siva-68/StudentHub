import Student from "../models/student.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js";

export const createStudent = asyncHandler(async (req, res) => {
    const { name, email, phone, course, year } = req.body;

    // 1. VALIDATION CHECK
    if (!name || !email || !phone || !course || !year) {
        throw new ApiError(400, "All fields are required");
    }

    // 2. CHECK DUPLICATE STUDENT
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
        throw new ApiError(409, "Student already exists");
    }

    // 3. CREATE STUDENT
    const student = await Student.create({
        name,
        email,
        phone,
        course,
        year,
        createdBy: req.user._id
    });

    // 4. SEND RESPONSE
    return res
        .status(201)
        .json(new ApiResponse(201, student, "Student created successfully"));
});

/**
 * GET ALL STUDENTS (WITH PAGINATION)
 * -----------------------------------
 * Fetch all students with pagination support
 */
export const getAllStudents = asyncHandler(async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const students = await Student.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Student.countDocuments();

    return res.status(200).json(
        new ApiResponse(200, {
            students,
            total,
            page,
            pages: Math.ceil(total / limit)
        }, "Students fetched successfully")
    );
});


/**
 * GET SINGLE STUDENT
 * -------------------
 * Fetch student by ID
 */
export const getStudentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, student, "Student fetched successfully"));
});


/**
 * UPDATE STUDENT
 * ---------------
 * Update student details
 */
export const updateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updatedStudent, "Student updated successfully"));
});


/**
 * DELETE STUDENT
 * ---------------
 * Remove student from database
 */
export const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    await Student.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Student deleted successfully"));
});


/**
 * SEARCH STUDENTS
 * ----------------
 * Search by name or email
 */
export const searchStudents = asyncHandler(async (req, res) => {

    const { keyword } = req.query;

    if (!keyword) {
        throw new ApiError(400, "Search keyword is required");
    }

    const students = await Student.find({
        $or: [
            { name: { $regex: keyword, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } }
        ]
    });

    return res
        .status(200)
        .json(new ApiResponse(200, students, "Search results fetched successfully"));
});