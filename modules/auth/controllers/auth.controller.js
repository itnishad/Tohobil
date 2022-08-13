/**
 * Auth Controller
 * 
 * @by faysal
 * @since 1.0
 */

const bcrypt = require('bcrypt');

const User = require('../../users/model/user.model.js');
const Token = require('../services/sign-jwt');

const registerController = async (req, res, next) =>{

    try {
        const userModel = await new User(req.body);
        const user = await userModel.save();
        const token = Token(user)
        res.status(201).json({
            Message: "User Successfully Register",
            User: user.toJSON(),
            Token: token
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const loginController = async(req, res, next)=>{

    try{
        const user = await User.findOne({ email : req.body.email });

        if(!user){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        if(user){
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            
            if(isValidPassword){
                
                const token = Token(user)

                return res.status(200).json({
                    Messgae: "Login Successfull",
                    User: user.toJSON(),
                    Token: token
                })
            }
            
            return res.status(401).json({
                message: "Unauthorized"
            })
           
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "There Was an Server Side Error"
        })
    }



}

module.exports = {
    Register : registerController,
    Login: loginController
}