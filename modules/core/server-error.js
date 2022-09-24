module.exports = (error, req, res, next)=>{
    console.log(error);
    res.status(500).json({
        message: "There is and Server Side error"
    })
}