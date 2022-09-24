const campaignServices = require("../services/campaign.services");
const {CampaignNotFound} = require('../config/payment.error');

const createCampaign = async (req, res, next) => {
  let body = JSON.parse(req.body.data);

  try {
    const result = await campaignServices.CreateACampaign(
      body,
      req.file.filename,
      req.user
    );

    return res.status(201).json({
      message: "Campaign Create Sussessfully.",
    });
  } catch (error) {
    next(error);
  }
};

const getAllCampaigns = async (req, res, next) => {

  const {limit} = req.query;
  try {
    let campaigns = await campaignServices.AllCampaign(limit);
    res.status(200).send(campaigns);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCampaign = async (req, res, next) => {
  try {
    const campaignId = req.params.id;
    const sCampaign = await campaignServices.SingleCampaign(campaignId);
    if (sCampaign.length <= 0) {
      throw new CampaignNotFound("campaign not found");
    }
    res.status(200).json(sCampaign);
  } catch (error) {
    next(new CampaignNotFound("campaign not found"));
  }
};

const getUserCampaign = async (req, res, next) => {
  try {
    const campaignId = req.params.id;
    let uCampaign = await campaignServices.UserCampaign(campaignId);
    if (uCampaign.length <= 0) {
      throw new CampaignNotFound("campaign not found");
    }
    res.status(200).send(uCampaign);
  } catch (error) {
    next(new CampaignNotFound("campaign not found"));
  }
};

const updateCampaign = async (req, res, next) => {
  try {
    const campaignId = req.params.id;
    let body = JSON.parse(req.body.data);
    body.deadline
      ? (body.deadline = new Date(body.deadline))
      : (body.deadline = new Date(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000
        ));
    body.goalAmount = parseInt(body.goalAmount);

    if(req.file){
        body.filename = req.file.filename;
    }

    const result = await campaignServices.UpdateCampaignBody(campaignId,body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(new CampaignNotFound("campaign not found"));
  }
};

const inactiveACampaign = async(req, res, next)=>{
  const campaignId = req.params.id;
  try {
    const result = await campaignServices.UpdateToInactive(campaignId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(new CampaignNotFound("campaign not found"));
  }
}

const activeACampaign = async(req, res, next)=>{
  const campaignId = req.params.id;
console.log(campaignId)
  try {
    const result = await campaignServices.UpdateToActive(campaignId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(new CampaignNotFound("campaign not found"));
  }

}

module.exports = {
  CreateCampaign: createCampaign,
  GetAllCampaign: getAllCampaigns,
  GetCampaign: getCampaign,
  GetUserCampaign: getUserCampaign,
  UpdateCampaign: updateCampaign,
  InactiveACampaign: inactiveACampaign,
  ActiveACampaign: activeACampaign
};
