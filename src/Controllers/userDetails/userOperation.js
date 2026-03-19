
const User=require("../../Model/user")
const getAllUser= async(req,res)=>{
     const data= await User.find();
     res.status(200).json({
        message:"all data fetch",
        user:data
     })
    // res.send("all data Fetch")
}
module.exports=getAllUser;