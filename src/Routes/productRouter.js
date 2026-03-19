const express=require("express")
const productRouter=express.Router();
const {addProduct,viewProduct,getSingleProduct,updateProduct,deleteProduct}=require("../Controllers/productData/productDetails")
const adminMiddleware=require("../Middleware/adminMiddleWareAuth")
const upload=require("../Middleware/imageMiddleware")

productRouter.post('/products',adminMiddleware,upload.single("image"),addProduct);
productRouter.get('/products',adminMiddleware,viewProduct);
productRouter.get('/product/:id',adminMiddleware,getSingleProduct);
productRouter.delete('/product/:id',adminMiddleware,deleteProduct);
productRouter.patch('/product/:id',adminMiddleware,upload.single("image"),updateProduct)

module.exports=productRouter;