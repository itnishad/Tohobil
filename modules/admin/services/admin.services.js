const User = require("../../users/model/user.model");
const VerificationModel = require("../model/userVerification.model");
const Campaign = require("../../campaigns/model/campaigns.mode");

const userDelete = async (_id) => {
  const deleteUser = await User.deleteOne({ _id });
  return deleteUser;
};

const allVerificationList = async () => {
  const result = await VerificationModel.find({}).populate({
    path: "campaignId",
  });
  return result;
};

const updateToInactive = async (_id) => {
  return (result = await Campaign.findOneAndUpdate(
    { _id },
    { active: false },
    {
      new: true,
    }
  ));
};

const updateToActive = async (_id) => {
  return (result = await Campaign.findOneAndUpdate(
    { _id },
    { active: true },
    {
      new: true,
    }
  ));
};

const updateToVerified = async (_id) => {
  const result = await Campaign.findOneAndUpdate(
    { _id },
    { isVerified: true },
    {
      new: true,
    }
  );

  return result;
};

module.exports = {
  UserDelete: userDelete,
  AllVerificationList: allVerificationList,
  UpdateToInactive: updateToInactive,
  UpdateToActive: updateToActive,
  UpdateToVerified: updateToVerified,
};
