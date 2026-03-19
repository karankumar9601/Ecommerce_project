
const express=require("express")
const userRouter=express.Router();
const getAllUser=require("../Controllers/userDetails/userOperation")
const adminMiddleware=require("../Middleware/adminMiddleWareAuth")


userRouter.get('/user/getAllUser',adminMiddleware,getAllUser)

module.exports=userRouter;