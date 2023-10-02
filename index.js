const express = require("express")
const app = express();

// port find out karna
require("dotenv").config()
const PORT = process.env.PORT || 3000

// middleware add karna
app.use(express.json())
const fileupload = require("express-fileupload")
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// db connection 
const dbConnect = require("./config/database")
dbConnect();

// cloud se connect karna he
 const cloudinary = require("./config/cloudinary")
 cloudinary.cloudinaryConnect();

//  api route mount karna hai
const Upload = require("./routes/Fileupload")
app.use('/api/v1/upload',Upload);

// activate server
app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})
