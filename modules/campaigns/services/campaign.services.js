const { path } = require("../../../app");
const Campaign = require("../model/campaigns.mode");

const createACampaign = async (body, fileName, user) => {
  body.deadline
    ? (body.deadline = new Date(body.deadline))
    : (body.deadline = new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      ));
  body.goalAmount = parseInt(body.goalAmount);

  const campaignBody = {
    ...body,
    filename: fileName,
    Amount: 0,
    user: user._id,
  };

  const campaignModel = new Campaign(campaignBody);

  const campaign = await campaignModel.save();
};

const allCampaign = async () => {
  const campaigns = await Campaign.find({})
    .populate({
      path: "user",
    })
    .sort({ createdAt: -1 })
    .select({
      createdAt: 0,
      updatedAt: 0,
    });
  return campaigns;
};

const singleCampaign = async (id) => {
  const SCampaign = await Campaign.find({ _id: id }).populate({
    path: "user",
  });

  return SCampaign;
};

const userCampaign = async (id) => {

  const uCampaign = await Campaign.find({ user: id })
    .populate({
      path: "user"
    })
    .sort({ createdAt: -1 })
    .select({
      createdAt: 0,
      updatedAt: 0,
    });

  return uCampaign;
};

const updateCampaignBody = async(_id,updateBody)=>{
  console.log(updateBody)
  return result = await Campaign.findOneAndUpdate({_id},updateBody,{
    new: true
  })
}

module.exports = {
  CreateACampaign: createACampaign,
  AllCampaign: allCampaign,
  SingleCampaign: singleCampaign,
  UserCampaign: userCampaign,
  UpdateCampaignBody:updateCampaignBody
};
