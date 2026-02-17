import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies['access-token'];
    
    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        next();
    } catch (error) {
        return next(errorHandler(403, 'Invalid or expired token'));
    }
};

export const optionalAuth = (req, res, next) => {
    const token = req.cookies['access-token'];
    
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id;
            req.userEmail = decoded.email;
        } catch (error) {
            // Token invalid but continue
        }
    }
    next();
};
