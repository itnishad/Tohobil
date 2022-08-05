//Reference https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go
/**
 * Auth middleware validator
 * 
 * @by faysal
 * @since 1.0
 */

const {check, validationResult} = require('express-validator');
const User = require('../../users/model/user.model')

const userValidators = [
    check('name')
    .isLength({min: 3})
    .withMessage('Name is Required Minimum Three Character')
    .trim(),

    check('email')
    .isEmail()
    .withMessage('Invali Email Address')
    .custom(async (value)=>{
       
            const user = await User.findOne({email: value});
            if(user){
                throw new Error("E-mail already in use")
            }
    })
    .trim(),

    check('password')
    .isLength({min:5})
    .withMessage("Required Minimum 5 Character"),

    check('confirmPassword')
    .isLength({min:5})
    .withMessage("Required Minimum 5 Character")
    .custom((value, {req}) =>{
        if (value !== req.body.password) {
            throw new Error('Password confirmation is incorrect');
        }else{
            return true;
        }
    })
]

const ValidationResult = (req, res, next)=>{
    
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next()
    }

    res.status(500).json({
        errors
    })
}

module.exports = {
    RegistraionValidation : userValidators,
    ValidationResult,
}