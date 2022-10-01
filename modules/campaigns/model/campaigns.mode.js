const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    title: {
        type: String,
        trim: true
    },

    content: String,

    Amount: {
        type: Number
    },

    goalAmount: {
        type: Number
    },

    deadline:{
        type: Date
    },

    country:{
        type:String
    },

    category:{
        type: String
    },

    filename: String,

    active: {
        type: Boolean,
        default: false
    },

    isVerified:{
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = new mongoose.model('Campaign', campaignSchema);