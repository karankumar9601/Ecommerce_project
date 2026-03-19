
const express = require("express")
const main = require("./src/config/Db_connection")
require('dotenv').config()
const cookieParser = require("cookie-parser")
const authRouter = require("./src/Routes/authRouter")
const cors = require("cors")
const redisClients = require("./src/config/redisConfig")
const userRouter=require("./src/Routes/userRouter")
const managerRouter=require("./src/Routes/managerRouter")
const productRouter=require("./src/Routes/productRouter")

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "https://bhagalpurmart.netlify.app",
    credentials: true
}));
//url of all API 
app.use('/user', authRouter)
app.use('/admin',userRouter)
app.use('/admin',managerRouter)
app.use('/admin',productRouter)

//conection estabilish
const initialConnection = async () => {
    await Promise.all([main(),redisClients.connect()]);
    console.log("DB connect")
    app.listen(process.env.PORT, () => {
        console.log("server started")

    })
}
initialConnection();