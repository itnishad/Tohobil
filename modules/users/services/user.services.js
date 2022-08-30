const Profile = require('../model/profile.model')
const UserPayment = require('../model/userpayment.model')

const getUserProfile = async(id)=>{
    const userProfile = await Profile.find({user: id})
    .populate({path:"user"})
    console.log(userProfile);
    return userProfile;
}

const userProfilUpdate = async(id, body)=>{
    const updateProfile = await Profile.findOneAndUpdate({user:id}, body, {
        new: true
    })
    return updateProfile;
}

const getUserPayment = async(id)=>{
    const result = await UserPayment.find({user: id})
    .populate({path:"user"});
    return result;
}


module.exports = {
    GetUserProfile: getUserProfile,
    UserProfilUpdate: userProfilUpdate,
    GetUserPayment: getUserPayment
}