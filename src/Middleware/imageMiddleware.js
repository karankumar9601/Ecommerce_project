const multer = require("multer")
const path = require("path")
const fs = require("fs")

const uploadFolder = path.join(__dirname, "../public/image");

//agar folder exist nhi karta to create kar dega
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true })
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(uploadFolder))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload=multer({
    storage:storage,
    limits:{
        fileSize:2*1024*1024
    }
})

module.exports=upload;