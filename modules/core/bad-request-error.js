module.exports =  (req, res, next)=>{
    res.status(400).json({
        "message":"Bad Request No Api Found"
    })
}