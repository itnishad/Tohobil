/**
 * Auth Router
 * 
 * @by faysal
 * @since 1.0
 */

 const express = require('express');
 const router = express.Router();

 const passport = require('passport');
 const Imguploder = require('./middlewares/fileUpload');
 const fileValidation = require('./middlewares/fileValidator')

 const UPLOADS_FOLDER = 'public/images'

 const {CreateCampaign,
        GetAllCampaign,
        GetCampaign,
        GetUserCampaign,
        UpdateCampaign,} = require('./controllers/campaign.controller')

router.get('/get-all-campaigns', GetAllCampaign);
router.get('/details/:id', GetCampaign);


 router.all('*', passport.authenticate('jwt', {session: false}));

router.post('/update/:id',Imguploder, UpdateCampaign);

router.post('/start', Imguploder, fileValidation, CreateCampaign);

router.get('/userCampaign/:id', GetUserCampaign);

//Admin Route


 
 
 module.exports = router;