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

module.exports = {
    DeletedUser: deletedUser
}