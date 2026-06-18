const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map(error => error.message)
            .join(", ");
    }

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid resource ID.";
    }

    // Duplicate Key Error
    if (err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists.`;
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        stack:
            process.env.NODE_ENV === "development"
                ? err.stack
                : undefined
    });
};

export default errorHandler;