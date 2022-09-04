const express = require('express');
const router = express.Router();

const {DeletedUser} = require('./controller/admin.controller')

router.get('/deletedUser/:id', DeletedUser);

module.exports = router;