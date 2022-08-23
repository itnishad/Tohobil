const Profile = require('../model/profile.model')

const getUserProfile = async(id)=>{
    const userProfile = await Profile.find({user: id})
    .populate({path:"user"})
    return userProfile;
}
const userProfilUpdate = async(id, body)=>{
    const updateProfile = await Profile.findOneAndUpdate({user:id}, body, {
        new: true
    })
    return updateProfile;
}


module.exports = {
    GetUserProfile: getUserProfile,
    UserProfilUpdate: userProfilUpdate
}