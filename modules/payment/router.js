const express = require('express');
const passport = require('passport');
const app = require('../../app');
const router = express.Router();

const {PaymentInit} = require('./controllers/payment.controller');

router.post ('/init/:id', PaymentInit)

router.post('/success', async(req, res, next)=>{
    return res.status(200).json({
        data: req.body
    })

    // return res.status(200).redirect("http://localhost:3000")
})

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