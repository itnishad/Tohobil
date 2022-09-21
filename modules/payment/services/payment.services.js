const CamlpaignModel = require("../../campaigns/model/campaigns.mode");
const CampaignPayentModel = require('../../campaigns/model/campaignPayment.model')

const paymentInitial = async () => {};

const getCampaign = async (_id) => {
  const result = await CamlpaignModel.findById({ _id });
  return result;
};

const updateCampaignAmount = async (_id, amount) => {
  const result = await CamlpaignModel.findOneAndUpdate({ _id },{$inc:{Amount: amount}},{new: true});
  return result;
};

const campaignHistory = async(campaignId)=>{
  const result = await CampaignPayentModel.find({
    campaign: campaignId
  })
  .populate({
    path: "user",
  })
  .sort({ createdAt: -1 });
  return result;
}

module.exports = {
  PaymentInitial: paymentInitial,
  GetCampaign: getCampaign,
  UpdateCampaignAmount: updateCampaignAmount,
  CampaignHistory: campaignHistory
};
