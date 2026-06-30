import Student from "../models/student.model.js";
import ApiError from "../utils/ApiError.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs-extra";

/*----------------------------------------------------------
 Helper Functions
----------------------------------------------------------*/

const uploadProfileImage = async (file) => {

    if (!file) {
        return {
            public_id: "",
            url: ""
        };
    }

    const uploaded = await cloudinary.uploader.upload(file.path, {
        folder: "StudentHub/Students"
    });

    await fs.remove(file.path);

    return {
        public_id: uploaded.public_id,
        url: uploaded.secure_url
    };

};

const deleteProfileImage = async (publicId) => {

    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId);

};

/*----------------------------------------------------------
 Create Student
----------------------------------------------------------*/

export const createStudentService = async (
    data,
    file,
    adminId
) => {

    const {
        name,
        email,
        phone,
        course,
        year,
        status
    } = data;

    if (!name || !email || !phone || !course || !year) {
        throw new ApiError(400, "All fields are required");
    }

    const existing = await Student.findOne({ email });

    if (existing) {
        throw new ApiError(409, "Student already exists");
    }

    const profileImage = await uploadProfileImage(file);

    const student = await Student.create({

        name,
        email,
        phone,
        course,
        year,
        status,

        createdBy: adminId,

        profileImage

    });

    return student;

};

/*----------------------------------------------------------
 Get All Students
----------------------------------------------------------*/

export const getAllStudentsService = async (query) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    course,
    year,
    sort = "createdAt",
    order = "desc",
  } = query;

  // 🧠 BUILD FILTER OBJECT
  const filter = {};

  if (course) {
    filter.course = course;
  }

  if (year) {
    filter.year = Number(year);
  }

  // 🔍 ADVANCED SEARCH (name + email)
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  // 📊 SORTING LOGIC
  const sortOrder = order === "asc" ? 1 : -1;

  // 📄 PAGINATION LOGIC
  const skip = (page - 1) * limit;

  // 🚀 DB QUERY
  const students = await Student.find(filter)
    .sort({ [sort]: sortOrder })
    .skip(skip)
    .limit(Number(limit));

  // 📦 TOTAL COUNT (for frontend pagination UI)
  const total = await Student.countDocuments(filter);

  return {
    students,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

/*----------------------------------------------------------
 Get Student
----------------------------------------------------------*/

export const getStudentByIdService = async (id) => {

    const student = await Student.findById(id);

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    return student;

};

/*----------------------------------------------------------
 Update Student
----------------------------------------------------------*/

export const updateStudentService = async (

    id,

    data,

    file

) => {

    const student = await Student.findById(id);

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    if (file) {

        if (student.profileImage.public_id) {

            await deleteProfileImage(
                student.profileImage.public_id
            );

        }

        student.profileImage =
            await uploadProfileImage(file);

    }

    student.name = data.name ?? student.name;
    student.email = data.email ?? student.email;
    student.phone = data.phone ?? student.phone;
    student.course = data.course ?? student.course;
    student.year = data.year ?? student.year;
    student.status = data.status ?? student.status;

    await student.save();

    return student;

};

/*----------------------------------------------------------
 Delete Student
----------------------------------------------------------*/

export const deleteStudentService = async (id) => {

    const student = await Student.findById(id);

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    if (student.profileImage.public_id) {

        await deleteProfileImage(
            student.profileImage.public_id
        );

    }

    await student.deleteOne();

};

/*----------------------------------------------------------
 Search Students
----------------------------------------------------------*/

export const searchStudentService = async (keyword) => {

    if (!keyword) {

        throw new ApiError(
            400,
            "Search keyword is required"
        );

    }

    return await Student.find({

        $or: [

            {
                name: {
                    $regex: keyword,
                    $options: "i"
                }
            },

            {
                email: {
                    $regex: keyword,
                    $options: "i"
                }
            },

            {
                phone: {
                    $regex: keyword,
                    $options: "i"
                }
            }

        ]

    });

};

export const getStudentStatsService = async () => {
  const total = await Student.countDocuments();
  const active = await Student.countDocuments({ status: "active" });
  const inactive = await Student.countDocuments({ status: "inactive" });

  const byCourse = await Student.aggregate([
    {
      $group: {
        _id: "$course",
        count: { $sum: 1 },
      },
    },
  ]);

  const byYear = await Student.aggregate([
    {
      $group: {
        _id: "$year",
        count: { $sum: 1 },
      },
    },
  ]);

  return {
    total,
    active,
    inactive,
    byCourse,
    byYear,
  };
};