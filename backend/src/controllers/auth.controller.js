const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const redis = require('../config/cache');

async function registerController(req, res) {

    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "user already exists with the same username or email"
        })
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username, email, password: hash
    })


    const token = jwt.sign({
        id: user._id,
        username: username
    }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    })

    res.cookie("token", token)

    res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            username: username,
            email: email
        }
    })

}


async function loginController(req, res) {

    const { username, email, password } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    }).select("+password")
    if (!isUserExists) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }
    const isPasswordCorrect = bcrypt.compare(password, isUserExists.password)

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }


    const token = jwt.sign({
        id: isUserExists._id,
        username: username
    }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    })

    res.cookie("token", token)

    res.status(201).json({
        message: "User login successfully",
        user: {
            id: isUserExists._id,
            username: username,
            email: email
        }
    })

}


async function getUserController(req, res) {
    const userId = req.user.id;
    const user = await userModel.findById(userId)
    if (!user) {
        return res.status(401).json({
            message: "user does not exists"
        })
    }
    return res.status(200).json({
        message: "User fetched successfully",
        user
    })

}


async function logoutController(req,res){
    const token = req.cookies.token

    req.clearCookie("token");
    redis.set(token,Date.now().toString(),"EX",60*60)

    return res.status(200).json({
        message:"logout successfully"
    })
}

module.exports = { registerController, loginController, getUserController,logoutController }