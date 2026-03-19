
const alllowsRole =  (...roles) => {
    return(req,res,next)=>{

        const {role}=req.user;

        if(role==='admin'){
            return next();
        }
        if(roles.includes(role)){
            return next();
        }
        return res.status(403).json({
            message:"you can't Access"
        })

    }

}

module.exports=alllowsRole;