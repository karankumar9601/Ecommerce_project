const cloudinary = require("../config/cloudinary")
const fs = require("fs")
const uploadOnCloudinary = async (localFilePath) => {

    try {
        if (!localFilePath) {
            throw new Error("localfile is not here")
        }
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "image" })
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }

}
module.exports=uploadOnCloudinary;