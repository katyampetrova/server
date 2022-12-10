const { parseToken } = require('../services/userService');

function hasUser() {
    return (req, res, next) => {
        const token = req.headers.cookie?.replace('accessToken=', '');
        const payload = parseToken(token);
        req.user = payload;
        req.token = token;

        if (req.user) {
            next();
        } else {
            res.status(401).json({ message: 'Please log in' });
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.status(400).json({ message: 'You are already logged in' });
        } else {
            next();
        }
    };
}

module.exports = {
    hasUser,
    isGuest
};