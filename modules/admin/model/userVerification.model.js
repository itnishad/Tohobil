const mongoose = require('mongoose');

const userVerificationSchema = new mongoose.Schema({

    campaignId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Campaign"
    },

    name:{
        type:String,
        trim: true
    },

    email:{
        type: String,
        trim: true
    },

    address:{
        type: String,
        trim: true
    },

    phone:{
        type: String,
        trim: true
    },

    documentType:{
        type: String,
        trim: true
    },
    country:{
        type: String,
        trim: true
    },
    city:{
        type: String,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    photograph:{
        type: String
    },
    documentFile:{
        type: String
    },
    workImg:{
        type:[String]
    }
}, {timestamps: true})

module.exports = new mongoose.model ('UserVerificationRequest', userVerificationSchema);