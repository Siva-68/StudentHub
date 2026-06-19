import express from "express";
import {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    searchStudents
} from "../controllers/student.controller.js";
import { getStudentStats } from "../controllers/student.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    upload.single("profileImage"),
    createStudent
);

router.get("/", getAllStudents);

router.get(
    "/",
    protect,
    authorizeRoles("admin"),
    getAllStudents
);

router.get(
    "/:id",
    protect,
    authorizeRoles("admin"),
    getStudentById
);
router.get(
    "/:id",
    protect,
    authorizeRoles("admin"),
    getStudentById
);
router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    upload.single("profileImage"),
    updateStudent
);
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteStudent
);
router.get(
    "/search",
    protect,
    authorizeRoles("admin"),
    searchStudents
);
export default router;

router.get("/stats", getStudentStats);