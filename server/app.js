import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import studentRoutes from "./routes/student.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

// ─── CORS ───
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);

// ─── Body Parsers ───
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// ─── Health Check ───
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "StudentHub Backend is Running 🚀",
    });
});
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "StudentHub API is healthy 🚀",
    });
});

// ─── Routes ───
app.use("/api/auth",     authRoutes);
app.use("/api/students", studentRoutes);

// ─── 404 ───
app.use("/",(req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`,
    });
});

// ─── Global Error Handler (MUST be last) ───
app.use(errorHandler);

export default app;