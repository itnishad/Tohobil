const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Auth Section.
 */
app.use('/v1', require('./modules/auth/routes.js'))
/**
 * Auth Section End 
 */

require('./modules/auth/config/passport');


module.exports = app;
