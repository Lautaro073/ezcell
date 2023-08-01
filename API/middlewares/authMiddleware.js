// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Obtener el token del header de la solicitud
    const token = req.header('Authorization');

    // Si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Si hay token, intenta verificarlo
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
