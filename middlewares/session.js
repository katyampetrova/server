const { parseToken } = require('../services/userService');


module.exports = () => (req, res, next) => {
    // const token = req.headers['accessToken'];
    // console.log(req.headers.cookie.replace('accessToken=', ''));

    const token = req.headers.cookie?.replace('accessToken=', '');
    if (token) {
        try {
            const payload = parseToken(token);
            req.user = payload;
            req.token = token;
            console.log('here');
        } catch (err) {
            return res.status(401).json({ message: 'Invalid authorization token'});
        }
    }

    next();
};