const { Result } = require('express-validator');
const ProfileModel = require('../model/profile.model');
const PaymentModel = require('../model/userpayment.model');
const CampaignPaymentModel = require('../../campaigns/model/campaignPayment.model')
module.exports = async function(app){

    const emitter = app.get('eventEmitter');

    emitter.on('createProfile', async(body)=>{

        try {
            const newProfile = await new ProfileModel(body);
            const userProfile = await newProfile.save();
        } catch (error) {
            console.log("Event Error")
            console.log(error);
        }    
    })

    emitter.on('createPaymentHistory', async(body)=>{
        try {
            const paymentHistory = new PaymentModel(body);
            const result = await paymentHistory.save();
        } catch (error) {
            console.log("Event Error");
            console.log(error);
        }    

    })

    emitter.on("createCampaignHistory", async(body)=>{
        try {
            const campaignHistory = new CampaignPaymentModel(body);
            const result = await campaignHistory.save();
        } catch (error) {
            console.log("Event Error");
            console.log(error);
        }
    })
}