const service = require('../services/admin.services');

const deletedUser = async(req, res, next)=>{
    try {
        const id = req.params.id
        const result = await service.UserDelete(id);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
    
}

const userVerifi = (req, res, next) =>{
    const body = JSON.parse(req.body.data);
    const files = req.files;

    const workImgArray = files['workImg'].map(item=> item.filename);

    const userObject = {
        ...body,
        photograph: files['photograph'][0].filename,
        documentFile:files['documentFile'][0].filename,
        workImg: workImgArray
    }

    res.status(201).json({
        message:"Done"
    })
}

module.exports = {
    DeletedUser: deletedUser,
    UserVerifi: userVerifi
}