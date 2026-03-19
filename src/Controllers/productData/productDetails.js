const uploadOnCloudinary = require("../../Middleware/uploadOnCloudinaryMidd")
const product = require("../../Model/itemsModel")


const addProduct = async (req, res) => {
    const productData = {
        ...req.body,
        image: res.secure_url,
    }
    try {
        if (!req.file) {
            res.json({
                success: false,
                message: "Image Required"
            })
        }
        const response = await uploadOnCloudinary(req.file.path)
        if (!response) {
            res.json({
                success: false,
                message: "image not save on cloudinary"
            })

        }
        const productInfo = await product.create(productData);
        if (!productInfo) {
            res.json({
                success: false,
                message: "product information is not save in Database"
            })
        }
        res.json({
            success:true,
            message:"product added successfully",
            data:product
        })
    } catch (error) {
       res.json({
        success:false,
        message:error.message
       })
    }

}

const viewProduct = async (req, res) => {
    try{
          const result= await product.find();
          if (!result) {
            res.json({
                success:false,
                message:"product Details not found"
            })
          }
          res.json({
            success:true,
            message:"All Product Fetched",
            data:result
          })

    }catch(error){

    }
  
   

}
const getSingleProduct = async (req, res) => {

}
const deleteProduct = async (req, res) => {

}
const updateProduct = async (req, res) => {

}

module.exports = { addProduct, viewProduct, getSingleProduct, deleteProduct, updateProduct }