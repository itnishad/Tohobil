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

    category:{
        type: String
    },

    filename: String,

}, { timestamps: true })

module.exports = new mongoose.model('Campaign', campaignSchema);