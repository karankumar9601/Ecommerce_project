
const jwt = require("jsonwebtoken")
const User = require("../Model/user")
const redisClients = require("../config/redisConfig")
const adminMiddleware = async (req, res,next) => {

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
    console.log(result)
    if (!result) {
        throw new Error("User does not exist")
    }
    //check redis Block List 
    const isBlocked= await redisClients.exists(`token:${token}`)
    if (isBlocked) {
        throw new Error("token is already in Block List")
    }
    req.user=result;
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    
    next();
        
    } catch (error) {
       res.status(500).send("Error: "+error.message) 
    }
}
module.exports=adminMiddleware;