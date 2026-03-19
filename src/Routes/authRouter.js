
const express=require("express")
const authRouter=express.Router();
const {register,login,logout,getProfile,adminRegister}=require("../Controllers/userAuth/userAuthData")
const userMiddleware=require("../Middleware/userMiddlewareAuth")
const adminMiddleware=require("../Middleware/adminMiddleWareAuth")


authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',userMiddleware,logout);
authRouter.get('/getprofile',userMiddleware,getProfile);
authRouter.post('/create-user',adminMiddleware,adminRegister)


module.exports=authRouter;
