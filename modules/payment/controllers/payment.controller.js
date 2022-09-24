const { response } = require("../../../app");
const services = require("../services/payment.services");
const SSLCommerzPayment = require("sslcommerz-lts");
const axios = require("axios");
const {CampaignNotFound} = require('../../campaigns/config/payment.error');

const paymentInit = async (req, res, next) => {
  const { name, email, amount, phone, city } = req.body;
  const userId = req.params.Uid;
  const campaignId = req.params.Cid;

  const data = {
    total_amount: 100,
    currency: "BDT",
    tran_id: "REF123",
    success_url: "http://localhost:4000/v1/payment/success",
    fail_url: "http://localhost:4000/v1/payment/fail",
    cancel_url: "http://localhost:4000/v1/payment/cancel",
    ipn_url: "http://localhost:4000/v1/payment/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "cust@yahoo.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
    multi_card_name: "mastercard",
    value_a: "ref001_A",
    value_b: "ref002_B",
    value_c: "ref003_C",
    value_d: "ref004_D",
  };

  const updateData = {
    ...data,
    total_amount: amount,
    cus_name: name,
    cus_email: email,
    cus_phone: phone,
    cus_city: city,
    value_a: userId,
    value_b: campaignId,
  };

  // console.log(updateData);

  const sslcommer = new SSLCommerzPayment("testbox", "qwerty", false);

  sslcommer.init(updateData).then((data) => {
    //process the response that got from sslcommerz
    //https://developer.sslcommerz.com/doc/v4/#returned-parameters

    if (data?.GatewayPageURL) {
      return res.status(200).send(data?.GatewayPageURL);

      // return res.status(200).redirect(data?.GatewayPageURL);
    }
    console.log(data);
    return res.status(400).json({
      message: "SSL error",
    });
  });
};

const paymentSuccess = async (req, res, next) => {
  //All Amount by user
  const userBody = {
    user: req.body.value_a,
    transaction: req.body.bank_tran_id,
    cardtype: req.body.card_type,
    amount: req.body.amount,
  };

  //Campaign Amount by user
  const campaignBody = {
    user: req.body.value_a,
    campaign: req.body.value_b,
    transaction: req.body.bank_tran_id,
    cardtype: req.body.card_type,
    amount: req.body.amount,
  };

  try {
    const Ucampaign = await services.UpdateCampaignAmount(
      req.body.value_b,
      req.body.amount
    );

    if (Ucampaign) {
     const emitter = req.app.get('eventEmitter');
      emitter.emit("createPaymentHistory", userBody);
      emitter.emit("createCampaignHistory", campaignBody);
    }else{
        throw new Error("Transcation Error");
    }

    return res.status(200).json({
      data: Ucampaign,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const campaignPaymentHistory = async(req, res, next)=>{

  try {
    const campaignId = req.params.campaignId;
    const campaignHistoryRes = await services.CampaignHistory(campaignId);
    res.json(campaignHistoryRes);
  } catch (error) {
    next(new CampaignNotFound("Campaign Not Found"));
  }
  
}

module.exports = {
  PaymentInit: paymentInit,
  PaymentSuccess: paymentSuccess,
  CampaignPaymentHistory: campaignPaymentHistory
};
