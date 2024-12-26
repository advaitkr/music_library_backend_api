const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to verify the JWT token
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication token is required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using secret
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid token or user not found' });
        }

        req.user = user; // Attach user data to request object
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

// Middleware for role-based access control
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        next();
    };
};

module.exports = {
    authenticate,
    authorize,
};
