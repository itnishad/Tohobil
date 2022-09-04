const User = require('../../users/model/user.model');

const userDelete = async(_id)=>{
    const deleteUser = await User.deleteOne({_id});
    return deleteUser;

}

module.exports = {
    UserDelete: userDelete
}