const validoter=require("validator")

const validate=(data)=>{

    const requireFields=["fullName","userEmail", "password"];
    const isAllowed=requireFields.every((k)=>Object.keys(data).includes(k));
    
    if(!isAllowed){
        throw new Error("Something went wrong");
    }
    if(!validoter.isEmail(data.userEmail)){
        throw new Error("Invalid Email");
    }
    if(!validoter.isStrongPassword(data.password)){
        throw new Error("Week Password ! try again")
    }

}
module.exports=validate;