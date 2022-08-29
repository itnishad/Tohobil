const express = require('express');
const path = require('path');
const EventEmitter  = require('events')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { json } = require('express');
const passport = require('passport');

require('dotenv').config()

const eventEmitter = new EventEmitter();

const app = express();



app.use(logger('dev'));
app.use(cors({
    origin:["http://localhost:3000","https://sandbox.sslcommerz.com"]
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '/public')));
app.set('eventEmitter', eventEmitter);

/**
 * Auth Section.
 */
app.use('/v1/auth', require('./modules/auth/routes.js'))
/**
 * Auth Section End 
 */
app.use('/v1/user', require('./modules/users/router'))
app.use('/v1/campaign', require('./modules/campaigns/router.js'))
app.use('/v1/payment', require('./modules/payment/router'));

require('./modules/auth/config/passport');


app.use('*', (req, res, next)=>{
    res.status(400).json({
        "message":"No Data"
    })
})

app.use((error, req, res, next)=>{
    console.log(error);
    res.status(500).json({
        message: "There is and Server Side error"
    })
})

require('./modules/users/events')(app);

module.exports = app;
