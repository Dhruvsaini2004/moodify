import redis from '../config/cache';

const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken")

export async function identifyUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({
            message: "token not found"
        })
    }
    const isTokenBlacklisted = redis.get(token)
    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Token is blacklisted"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (e) {
        return res.status(401).json({
            message:"invalid token!"
        })
    }

}