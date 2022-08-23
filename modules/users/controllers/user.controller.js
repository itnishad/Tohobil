const services = require("../services/user.services");

const getUserProfile = async (req, res, next) => {
  try {
    const userProfile = await services.GetUserProfile(req.user._id);
    res.status(200).json(userProfile);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateuserProfile = async (req, res, next) => {
  try {
    const {userName,email,firstName,lastName,website,bio} = req.body;
    const profileBody = {
        firstName,
        lastName,
        website,
        bio
    }
    const result = await services.UserProfilUpdate(req.user._id, profileBody);
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  GetUserProfile: getUserProfile,
  UpdateuserProfile: updateuserProfile,
};
