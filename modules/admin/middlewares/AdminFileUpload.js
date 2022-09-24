const uploder = require("../../../config/multerAdmin")
const Imguploder = (req, res, next)=>{

    const upload = uploder("files", ["image/jpeg","image/jpg","image/png",3000000,"Only .jpg, or .png format allowed"]);

    upload.fields([
        {name:'photograph', maxCount: 1},
        {name:'documentFile', maxCount: 1},
        {name:'workImg', maxCount: 3}
    ])(req, res, (err)=>{
        if(err){
            console.log("Error is ", err)
            res.status(500).json({
                error: err.message
            })
        }else{
            next()
        }
    })
}

module.exports = Imguploder