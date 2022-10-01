const service = require("../services/admin.services");
const UserVerifiModel = require("../model/userVerification.model");
const { CampaignNotFound } = require("../../campaigns/config/payment.error");
const campaignServices = require('../services/admin.services')

const deletedUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await service.UserDelete(id);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const userVerifi = async (req, res, next) => {
  const body = JSON.parse(req.body.data);
  const files = req.files;

  const workImgArray = files["workImg"].map((item) => item.filename);

  const userObject = {
    ...body,
    photograph: files["photograph"][0].filename,
    documentFile: files["documentFile"][0].filename,
    workImg: workImgArray,
  };

  try {
    const newUserVerification = await new UserVerifiModel(userObject);
    const result = await newUserVerification.save();

    res.status(201).json({
      message: "Done",
      object: result,
    });
  } catch (error) {
    next(error);
  }
};

const getVerificationList = async (req, res, next) => {
  try {
    const result = await service.AllVerificationList();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const inactiveACampaign = async (req, res, next) => {
  const campaignId = req.params.id;
  try {
    const result = await campaignServices.UpdateToInactive(campaignId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(new CampaignNotFound("campaign not found"));
  }
};

const activeACampaign = async (req, res, next) => {
  const campaignId = req.params.id;
  try {
    const result = await campaignServices.UpdateToActive(campaignId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(new CampaignNotFound("campaign not found"));
  }
};

const campaignVerified = async (req, res, next) => {
  const campaignId = req.params.id;
  try {
    const result = await campaignServices.UpdateToVerified(campaignId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(new CampaignNotFound("campaign not found"));
  }
};

module.exports = {
  DeletedUser: deletedUser,
  UserVerifi: userVerifi,
  GetVerificationList: getVerificationList,
  InactiveACampaign: inactiveACampaign,
  ActiveACampaign: activeACampaign,
  CampaignVerified: campaignVerified,
};
