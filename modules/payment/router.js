const express = require('express');
const passport = require('passport');
const app = require('../../app');
const router = express.Router();

const {PaymentInit,
PaymentSuccess} = require('./controllers/payment.controller');

router.post ('/init/:Uid/:Cid', PaymentInit)

router.post('/success', PaymentSuccess)

router.post('/fail', async(req, res, next)=>{
    return res.status(200).json({
        data: req.body
    })
})

router.post('/cancel', async(req, res, next)=>{
    return res.status(200).json({
        data: req.body
    })
})

router.post('/ipn', async(req, res, next)=>{
    return res.status(200).json({
        data: req.body
    })
})

module.exports = router