/**
 * Auth Router
 * 
 * @by faysal
 * @since 1.0
 */

 const express = require('express');
 const router = express.Router();

 const passport = require('passport');
 const multer = require('multer');
 const Imguploder = require('./middlewares/fileUpload');
 const fileValidation = require('./middlewares/fileValidator')

 const UPLOADS_FOLDER = 'public/images'

 const {CreateCampaign,
        GetAllCampaign,
        GetCampaign,
        GetUserCampaign,
        UpdateCampaign} = require('./controllers/campaign.controller')

let upload = multer({
    dest: UPLOADS_FOLDER
})
router.get('/get-all-campaigns', GetAllCampaign);
router.get('/details/:id', GetCampaign);
router.post('/update/:id',Imguploder, UpdateCampaign);

 router.all('*', passport.authenticate('jwt', {session: false}))

//  router.post('/start', upload.single('file'), (req, res, next)=>{
//     console.log(req.file);
//     res.send("200");
//  })

router.post('/start', Imguploder, fileValidation, CreateCampaign);

router.get('/userCampaign/:id', GetUserCampaign);
 
 
 module.exports = router;