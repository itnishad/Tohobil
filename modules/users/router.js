const express = require('express');
const passport = require('passport');
const router = express.Router();

const {GetUserProfile,
UpdateuserProfile,
GetPaymentHistory,
GetAllUserList} = require('./controllers/user.controller');

router.all('*', passport.authenticate('jwt', {session: false}))
router.get('/getAllUser', GetAllUserList)
router.get('/profile', GetUserProfile);
router.post('/profile/update',UpdateuserProfile);
router.get("/payment/all/:id", GetPaymentHistory);

module.exports = router;