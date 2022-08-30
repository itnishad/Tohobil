/**
 * User Model
 * 
 * @by faysal
 * @since 1.0
 */

 const mongoose = require('mongoose');

 const PaymentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
 })

 module.exports = new mongoose.model("UserPayment", PaymentSchema)

