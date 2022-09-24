const pathext = require('path');
const multer = require('multer');
const { dirname } = require('path');

const uploder = (path, file_type, file_size, error_msg)=>{
    
    const UPLOADS_FOLDER = `${__dirname}/../public/Adminimages`
    const storage = multer.diskStorage({
        destination: (_req, _file, cb) =>{
            cb(null, UPLOADS_FOLDER)
        },
        filename: (_req, file, cb)=>{
            const fileExt = pathext.extname(file.originalname);
            const fileName = file.originalname
            .replace(fileExt, "")
            .toLocaleLowerCase()
            .split(" ")
            .join("-")+"-"+Date.now();
            
            cb(null, fileName+fileExt)
        }
    })

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: file_size
        },
        fileFilter: (_req, file, cb)=>{
            if(file_type.includes(file.mimetype)){
                cb(null, true)
            }else{
                cb(new Error(error_msg))
            }
        }
    })
    return upload;
}
module.exports = uploder