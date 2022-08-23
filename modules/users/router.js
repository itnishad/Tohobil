const express = require('express');
const passport = require('passport');
const router = express.Router();

const {GetUserProfile,
UpdateuserProfile} = require('./controllers/user.controller')

router.all('*', passport.authenticate('jwt', {session: false}))
router.get('/profile', GetUserProfile);
router.post('/profile/update',UpdateuserProfile)

module.exports = router;