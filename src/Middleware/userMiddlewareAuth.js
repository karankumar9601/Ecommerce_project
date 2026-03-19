const jwt = require("jsonwebtoken")
const User = require("../Model/user")
const redisClients = require("../config/redisConfig")
const userMiddleware = async (req, res, next) => {

    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Invalid token")
        }
        const payload = jwt.verify(token, process.env.JWT_KEY);
        const { _id } = payload;
        if (!_id) {
            throw new Error("Id Invalid")
        }
        //fetch user
        const result = await User.findById(_id)

        if (!result) {
            throw new Error("User does not exist")
        }
        //check redis Block List 
        const isBlocked = await redisClients.exists(`token:${token}`)
        if (isBlocked) {
            throw new Error("token is already in Block List")
        }
        req.user = result;


        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
}
module.exports = userMiddleware;