const services = require("../services/user.services");
const {ProfileNotFound} = require('../config/user.error')

const getUserProfile = async (req, res, next) => {
  try {
    const userProfile = await services.GetUserProfile(req.user._id);
    res.status(200).json(userProfile);
  } catch (error) {
    next(new ProfileNotFound("Profile Not Found"));
  }
};

const updateuserProfile = async (req, res, next) => {
  try {
    const { userName, email, firstName, lastName, website, bio } = req.body;
    const profileBody = {
      firstName,
      lastName,
      website,
      bio,
    };
    const result = await services.UserProfilUpdate(req.user._id, profileBody);
    res.status(200).json(result);
  } catch (error) {
    next(new ProfileNotFound("Profile Not Found"));
  }
};

const getPaymentHistory = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userPayment = await services.GetUserPayment(userId);
    res.status(200).send(userPayment);
  } catch (error) {
    next(new ProfileNotFound("Profile Not Found"));
  }
};

const getAllUserList = async (req, res, next) =>{
    try {

      const userList = await services.GetUserList();
      res.status(200).send(userList);
      
    } catch (error) {
      next(error);
    }
}

const getUserProfileById = async (req,res,next)=>{
  const userId = req.params.userId;
  try {
    const userProfile = await services.GetUserProfilebyId(userId);
    res.status(200).json(userProfile);
  } catch (error) {
    next(new ProfileNotFound("Profile Not Found"));
  }
}

module.exports = {
  GetUserProfile: getUserProfile,
  UpdateuserProfile: updateuserProfile,
  GetPaymentHistory: getPaymentHistory,
  GetAllUserList: getAllUserList,
  GetUserProfileById: getUserProfileById
};
