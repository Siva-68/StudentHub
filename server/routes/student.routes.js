import express from "express";
import {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    searchStudents
} from "../controllers/student.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    createStudent
);

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