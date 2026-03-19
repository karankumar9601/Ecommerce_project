
const User = require("../../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const validate = require("../../validation/userAuthValidation");
const redisClients = require("../../config/redisConfig");
const roleRoutes=require("../../config/roleRoutes")


const register = async (req, res) => {

    try {
        //validate the data
        validate(req.body);
        const { fullName, userEmail, password } = req.body;
        req.body.password = await bcrypt.hash(password, 10);
        req.body.role = 'user';
        const user = await User.create(req.body);
        res.status(200).json({
            success: true,
            message: "User Register Successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
}

const login = async (req, res) => {
    try {

        const { userEmail, password } = req.body;
        if (!userEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Invalid emailId and Password"
            })
        }
        const user = await User.findOne({ userEmail })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Dors not exist"
            })
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        const token = jwt.sign({ _id: user._id, userEmail: userEmail, role: user.role }, process.env.JWT_KEY, { expiresIn: 60 * 60 })
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "token does not created"
            })
        }
        // const redirectTo=roleRoutes[user.role];
        res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
        res.status(200).json({
            seccess: true,
            message: "User Login Successfully",
            user: {
                _id: user._id,
                role: user.role,
                userEmail: user.userEmail,
                fullName: user.fullName
            }
        })

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }


}

const logout = async (req, res) => {
    try {
        //validated the token
        const { token } = req.cookies;
        console.log(token)
        const payload = jwt.decode(token)
        await redisClients.set(`token:${token}`, 'blocked')
        await redisClients.expireAt(`token:${token}`, payload.exp)
        res.cookie('token', null, { expires: new Date(Date.now()) })
        res.status(200).json({
            success: true,
            message: "user logout Successfully"
        })

    } catch (error) {
        res.status(401).send("Error: " + error.message)
    }


}

const getProfile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        res.status(200).json({
            success: true,
            data: user
        })

    } catch (error) {
       res.status(500).json({
        success:false,
        message:error.message
       })
    }
}

const adminRegister = async (req, res) => {
    console.log(req.body);

    try {
        //validate the data
        

        validate(req.body);
        const { fullName, userEmail, password,role } = req.body;
        req.body.password = await bcrypt.hash(password, 10);
        const user = await User.create(req.body);
       
       
        res.status(200).json({
            success: true,
            message: "User Assignee Successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
}

module.exports = { register, login, logout, getProfile,adminRegister }