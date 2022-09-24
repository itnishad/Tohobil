const express = require('express');
const router = express.Router();

const Imguploder = require('./middlewares/AdminFileUpload');

const {DeletedUser,
    UserVerifi} = require('./controller/admin.controller');

router.get('/deletedUser/:id', DeletedUser);
router.post('/user/verifiRequest', Imguploder, UserVerifi);

module.exports = router;