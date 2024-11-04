const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
const roleMiddleware = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ message: 'Access forbidden' });
    next();
};

module.exports = { authMiddleware, roleMiddleware };