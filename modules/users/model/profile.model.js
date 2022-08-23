/**
 * User Model
 * 
 * @by faysal
 * @since 1.0
 */

 const mongoose = require('mongoose');

 const userProfile = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    firstName: {
        type: String,
        trim: true
    },

    lastName: {
        type: String,
        trim: true
    },

    website:{
        type: String,
        trim: true
    },

    bio:{
        type: String,
        trim: true
    },

 }, { timestamps: true });

 module.exports = new mongoose.model("Profile", userProfile);