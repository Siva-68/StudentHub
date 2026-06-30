import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getStudentStatsService } from "../services/student.service.js";
import {

    createStudentService,

    getAllStudentsService,

    getStudentByIdService,

    updateStudentService,

    deleteStudentService,

    searchStudentService

} from "../services/student.service.js";

/*----------------------------------------------------------
 Create Student
----------------------------------------------------------*/

export const createStudent = asyncHandler(async (req, res) => {

    const student = await createStudentService(

        req.body,

        req.file,

        req.user._id

    );

    return res.status(201).json(

        new ApiResponse(

            201,

            "Student created successfully",

            student

        )

    );

});

/*----------------------------------------------------------
 Get All Students
----------------------------------------------------------*/

export const getAllStudents = asyncHandler(async (req, res) => {

    const result =
        await getAllStudentsService(req.query);

    return res.status(200).json(

        new ApiResponse(

            200,

            "Students fetched successfully",

            result

        )

    );

});

/*----------------------------------------------------------
 Get Student
----------------------------------------------------------*/

export const getStudentById = asyncHandler(async (req, res) => {

    const student =
        await getStudentByIdService(req.params.id);

    return res.status(200).json(

        new ApiResponse(

            200,

            "Student fetched successfully",

            student

        )

    );

});

/*----------------------------------------------------------
 Update Student
----------------------------------------------------------*/

export const updateStudent = asyncHandler(async (req, res) => {

    const student =
        await updateStudentService(

            req.params.id,

            req.body,

            req.file

        );

    return res.status(200).json(

        new ApiResponse(

            200,

            "Student updated successfully",

            student

        )

    );

});

/*----------------------------------------------------------
 Delete Student
----------------------------------------------------------*/

export const deleteStudent = asyncHandler(async (req, res) => {

    await deleteStudentService(req.params.id);

    return res.status(200).json(

        new ApiResponse(

            200,

            "Student deleted successfully",

            null

        )

    );

});

/*----------------------------------------------------------
 Search Students
----------------------------------------------------------*/

export const searchStudents = asyncHandler(async (req, res) => {

    const students =
        await searchStudentService(req.query.keyword);

    return res.status(200).json(

        new ApiResponse(

            200,

            "Search completed",

            students

        )

    );

});

export const getStudentStats = asyncHandler(async (req, res) => {
  const stats = await getStudentStatsService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Stats fetched successfully", stats));
});