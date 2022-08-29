const { response } = require('../../../app')
const services = require('../services/payment.services')
const SSLCommerzPayment = require('sslcommerz-lts')
const axios = require('axios');


const paymentInit = async(req, res, next)=>{

    const {name, email, amount, phone, city} = req.body;
    const campaignId = req.params.id;
    
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
        value_a: campaignId
    }

    const sslcommer = new SSLCommerzPayment("testbox", "qwerty", false);
    sslcommer.init(updateData).then(async(data) => {
        //process the response that got from sslcommerz
        //https://developer.sslcommerz.com/doc/v4/#returned-parameters
    
        if(data?.GatewayPageURL){

            return res.status(200).send(data?.GatewayPageURL);
            
            // return res.status(200).redirect(data?.GatewayPageURL);
        }
        return res.status(400).json({
            message:"SSL error"
        })
      });
}

module.exports = {
    PaymentInit: paymentInit
}