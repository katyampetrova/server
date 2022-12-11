const { parseToken } = require('../services/userService');


module.exports = () => (req, res, next) => {
    // const token = req.headers['accessToken'];
    // console.log(req.headers.cookie.replace('accessToken=', ''));

    const token = req.headers.cookie?.replace('accessToken=', '');
    // console.log(req.cookie);
    // console.log(token);
    if (token) {
        try {
            const payload = parseToken(token);
            req.user = payload;
            req.token = token;
        } catch (err) {
            res.cookie('accessToken', '000000', { httpOnly: true });
            return res.status(401).json({ message: 'Invalid authorization token'});
        }
    } else {
        res.cookie('accessToken', '000000', { httpOnly: true });
        return res.status(401).json({ message: 'Invalid authorization token'});
    }

    next();
};