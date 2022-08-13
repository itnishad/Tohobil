const uploder = require("../../../config/multerConfig")
const Imguploder = (req, res, next)=>{
    const upload = uploder("file", ["image/jpeg","image/jpg","image/png",3000000,"Only .jpg, or .png format allowed"]);
    upload.single('file')(req, res, (err)=>{
        if(err){
            res.status(500).json({
                error: err.message
            })
        }else{
            next()
        }
    })
}

module.exports = Imguploder