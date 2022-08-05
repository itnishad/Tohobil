/**
 * Auth Router
 * 
 * @by faysal
 * @since 1.0
 */

const express = require('express');
const router = express.Router();

//Validation
const {
    RegistraionValidation,
    ValidationResult
} = require('./middlewares/validator')

const AuthController = require('./controllers/auth.controller')

/**
 * Register
 */


router.post('/register',RegistraionValidation,[ValidationResult], AuthController.Register);


/**
 * Login
 */

router.post('/login', AuthController.Login)


module.exports = router;