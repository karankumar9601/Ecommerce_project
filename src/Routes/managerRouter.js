
const express=require("express")
const managerRouter=express.Router();
const userMiddleware=require("../Middleware/userMiddlewareAuth")
const alllowsRole=require("../Middleware/roleAuthMiddleware")
const managerDetails=require("../Controllers/Manager/managrAccess")

managerRouter.get('/manager',userMiddleware,alllowsRole('manager'),managerDetails)

module.exports=managerRouter;