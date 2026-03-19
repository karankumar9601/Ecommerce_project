
const mongoose = require("mongoose");
const { trim, isLowercase } = require("validator");
const { Schema } = mongoose
const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "fullName is minimum 3 chatacter"],
        maxLength: [16, "fullName is contains maximum 16 charcter"]

    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        isLowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'manager','human-resource'],
        default: 'user'
    },
    address:[
        {
            addressLine1:String,
            addressLine2:String,
            country:String,
            state:String,
            city:String,
            pincode:Number,
            phoneNo:Number,
        }
    ]
}, {
timestamps:true
})
const User = mongoose.model("UserData", UserSchema)
module.exports = User;