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



function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};
    console.log("kidher tk chale bhai")
    if(quality){
        options.quality=quality;
    }
    options.resource_type = "auto";
    
   return await cloudinary.uploader.upload(file.tempFilePath,options);
   console.log("idher poche kya")
}


// image Upload controller
exports.imageUpload = async(req,res) =>{
    try{
        // data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);


        // validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type->",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"FileType is not Supported!!"
            })
        }

        // file type support hogya!
        console.log("Uploading to codehelp");
        const response = await uploadFileToCloudinary(file,"CodeHelp");
        console.log(response);

        // db me entry save karni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })


        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully uploaded!"
        })

    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Something Went Wrong!"
        })

    }
}


// video upload ka controller
exports.videoUpload = async(req,res)=>{
    try{
        // data fetch karo jamkr
        
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log(file);

        // abhi validation karte he ajao
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type->",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"FileType is not Supported!!"
            })
        }

        // file type support hogya!
        console.log("Uploading to codehelp");
        const response = await uploadFileToCloudinary(file,"CodeHelp");
        console.log(response);

        // db me entry save karni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })


        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video successfully uploaded!"
        })
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong!!"
        })
    }
    // data fetch karo jamkr

}

// image size reducer
exports.imageSizeReducer = async(req,res)=>{
    try{
        // data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);


        // validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type->",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"FileType is not Supported!!"
            })
        }

        // file type support hogya!
        console.log("Uploading to codehelp");
        const response = await uploadFileToCloudinary(file,"CodeHelp",10);
        console.log(response);

        // db me entry save karni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })


        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully uploaded!"
        })

    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong!!"
        })
    }
}