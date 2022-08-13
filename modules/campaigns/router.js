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
 const Imguploder = require('./middlewares/fileUpload')

 const UPLOADS_FOLDER = 'public/images'

let upload = multer({
    dest: UPLOADS_FOLDER
})

 router.all('*', passport.authenticate('jwt', {session: false}))

//  router.post('/start', upload.single('file'), (req, res, next)=>{
//     console.log(req.file);
//     res.send("200");
//  })

 router.post('/start', Imguploder, (req, res, next)=>{
    console.log(req.file);
    res.send("200");
 })
 
 module.exports = router;