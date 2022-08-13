const express = require('express');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { json } = require('express');
const passport = require('passport');

require('dotenv').config()

const app = express();



app.use(logger('dev'));
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Auth Section.
 */
app.use('/v1/auth', require('./modules/auth/routes.js'))
/**
 * Auth Section End 
 */
app.use('/v1/campaign', require('./modules/campaigns/router.js'))

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
module.exports = app;
