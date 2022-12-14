const Profile = require('../model/profile.model')
const UserPayment = require('../model/userpayment.model')
const User = require('../model/user.model')

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

const getUserPayment = async(id)=>{
    const result = await UserPayment.find({user: id})
    .populate({path:"user"});
    return result;
}

const getUserList = async()=>{
    const result = await User.find({});
    return result;
}

const getUserProfilebyId = async(id)=>{
    const userProfile = await Profile.find({user: id})
    .populate({path:"user"});
    return userProfile;
}


module.exports = {
    GetUserProfile: getUserProfile,
    UserProfilUpdate: userProfilUpdate,
    GetUserPayment: getUserPayment,
    GetUserList: getUserList,
    GetUserProfilebyId: getUserProfilebyId
}