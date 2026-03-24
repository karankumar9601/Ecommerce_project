const uploadOnCloudinary = require("../../Middleware/uploadOnCloudinaryMidd")
const product = require("../../Model/itemsModel")


const addProduct = async (req, res) => {

    try {
        if (!req.file) {
            return res.json({
                success: false,
                message: "Image not found"
            })
        }
     
        const response = await uploadOnCloudinary(req.file.path)
     
        const productData = {
            ...req.body,
            image: response.secure_url,
        }
        if (!response) {
            return res.json({
                success: false,
                message: "image not save on cloudinary"
            })

        }
        const productInfo = await product.create(productData);
        if (!productInfo) {
            return res.json({
                success: false,
                message: "product information is not save in Database"
            })
        }
        return res.json({
            success: true,
            message: "product added successfully",
            data: product
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }

}

const viewProduct = async (req, res) => {
    try {
        const result = await product.find();
        if (!result) {
           return res.json({
                success: false,
                message: "product Details not found"
            })
        }
         return res.json({
            success: true,
            message: "All Product Fetched",
            data: result
        })

    } catch (error) {
          res.json({
            success:false,
            message:error.message
          })
    }



}
const getSingleProduct = async (req, res) => {

}
const deleteProduct = async (req, res) => {

}
const updateProduct = async (req, res) => {

}

module.exports = { addProduct, viewProduct, getSingleProduct, deleteProduct, updateProduct }