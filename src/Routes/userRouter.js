
const express=require("express")
const userRouter=express.Router();
const getAllUser=require("../Controllers/userDetails/userOperation")
const adminMiddleware=require("../Middleware/adminMiddleWareAuth")
const {viewProduct} =require("../Controllers/productData/productDetails")
//all user routes
userRouter.get('/user/getAllUser',adminMiddleware,getAllUser)
userRouter.get('/getAllProduct',viewProduct)

module.exports=userRouter;