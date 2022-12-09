const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const secret = 'q-90234xcwmietvuselrg';

const tokenBlacklist = new Set();

async function register(email, password) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Email is taken');
    }

    const user = await User.create({
        email,
        hashedPassword: await bcrypt.hash(password, 10)
    });

    return createToken(user);
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        throw new Error('Incorrect email or password');
    }

    // console.log(user);

    return createToken(user);
}

async function logout(token) {
    tokenBlacklist.add(token);
}

function createToken(user) {
    const payload = {
        _id: user._id,
        email: user.email
    };

    return {
        _id: user._id,
        email: user.email,
        accessToken: jwt.sign(payload, secret)
    };
}

function parseToken(token) {
    if (tokenBlacklist.has(token)) {
        throw new Error('Token is blacklisted');
    }

    return jwt.verify(token, secret);
}

function getProfileInfo(req, res, next) {
    console.log(req.user);
    const { _id: userId } = req.user;

    User.findOne({ _id: userId }, { hashedPassword: 0, __v: 0 })
        .then(user => { res.status(200).json(user) })
        .catch(next);
}

module.exports = {
    register,
    login,
    logout,
    parseToken,
    getProfileInfo
};