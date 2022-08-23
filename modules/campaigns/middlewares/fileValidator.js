
const fileValidation = (req, res, next)=>{

    if(!req.file){
        return res.status(400).json({
            error: "File is Empty Upload"
        })
    }

    next()
}

module.exports = fileValidation;