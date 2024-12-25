// Centralized Error Handling Middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging purposes

    const statusCode = err.statusCode || 500; // Default to 500 if no status code is set
    const message = err.message || 'Internal Server Error';

    // Send JSON response with the error details
    res.status(statusCode).json({
        success: false,
        message,
    });
};

module.exports = errorHandler;
