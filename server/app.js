import express from "express";
import cors from "cors";
import cookieParser from "cookie-parse";
import dotenv from "dotenv";

import studentRoutes from "./routes/student.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

/**
 * =========================
 * CORE MIDDLEWARES
 * =========================
 */

// Secure CORS configuration (frontend only allowed origin)
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
);

// Body parser with security limits
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Cookie parser (required for JWT in cookies)
// app.use(cookieParser);

/**
 * =========================
 * HEALTH CHECK ROUTE
 * =========================
 */
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "StudentHub API is healthy 🚀"
    });
});

/**
 * =========================
 * ROUTES
 * =========================
 */

// Auth routes (login/register)
app.use("/api/auth", authRoutes);

// Student routes (CRUD system)
app.use("/api/students", studentRoutes);

/**
 * =========================
 * 404 HANDLER (IMPORTANT)
 * =========================
 */
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`
    });
});

/**
 * =========================
 * GLOBAL ERROR HANDLER
 * =========================
 * MUST ALWAYS BE LAST
 */
app.use(errorHandler);

export default app;