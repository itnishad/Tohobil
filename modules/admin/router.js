const express = require("express");
const router = express.Router();

const Imguploder = require("./middlewares/AdminFileUpload");

const {
  DeletedUser,
  UserVerifi,
  GetVerificationList,
  InactiveACampaign,
  ActiveACampaign,
  CampaignVerified,
} = require("./controller/admin.controller");

router.get("/deletedUser/:id", DeletedUser);
router.post("/user/verifiRequest", Imguploder, UserVerifi);
router.get("/all/verification", GetVerificationList);
router.put("/inActive/:id", InactiveACampaign);
router.put("/Active/:id", ActiveACampaign);
router.put("/verified/:id", CampaignVerified);

module.exports = router;
