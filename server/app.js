import express from "express";
import cors from "cors";

import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "StudentHub API Running 🚀"
    });
});

/*
    Routes will be added here
*/

app.use(errorHandler);

export default app;