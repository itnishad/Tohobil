/**
 * User Model
 * 
 * @by faysal
 * @since 1.0
 */

 const mongoose = require('mongoose');

 const CampaignPaymentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign"
    },
    transaction: {
        type: String,
        trim: true
    },
    cardtype: {
        type: String,
        trim: true
    },
    amount: {
        type: Number
    }

 }, { timestamps: true })

 module.exports = new mongoose.model("CampaignPaymentHistory", CampaignPaymentSchema);