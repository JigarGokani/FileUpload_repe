const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async(req,res)=>{
    try{
        // fetch karege file ko
        const file = req.files.file;
        console.log("File aagyi jee ->" ,file);

        // path btao ki kidhr upload karni he
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH ->",path);

        // file ke move function se file upload hojayegi
        file.mv(path,(error)=>{
            console.log(error);
        });

        res.json({
            success:true,
            message:"Local file uploaded successfully!"
        })
    }
    catch(error){
        console.log(error)

    }


}