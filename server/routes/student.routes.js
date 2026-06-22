import express from "express";
import {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    searchStudents,
    getStudentStats
} from "../controllers/student.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// ─── Stats (must be BEFORE /:id to avoid route collision) ───
router.get("/stats", getStudentStats);

// ─── Create ───
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    upload.single("profileImage"),
    createStudent
);

// ─── Read All (public – accessible without auth for Dashboard stats) ───
router.get("/", getAllStudents);

// ─── Search ───
router.get(
    "/search",
    protect,
    authorizeRoles("admin"),
    searchStudents
);

// ─── Read One ───
router.get(
    "/:id",
    protect,
    authorizeRoles("admin"),
    getStudentById
);

// ─── Update ───
router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    upload.single("profileImage"),
    updateStudent
);

// ─── Delete ───
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteStudent
);

export default router;