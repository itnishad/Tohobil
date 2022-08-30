const CamlpaignModel = require("../../campaigns/model/campaigns.mode");
const paymentInitial = async () => {};

const getCampaign = async (_id) => {
  const result = await CamlpaignModel.findById({ _id });
  return result;
};

const updateCampaignAmount = async (_id, amount) => {
  const result = await CamlpaignModel.findOneAndUpdate({ _id },{$inc:{Amount: amount}},{new: true});
  return result;
};

module.exports = {
  PaymentInitial: paymentInitial,
  GetCampaign: getCampaign,
  UpdateCampaignAmount: updateCampaignAmount
};
