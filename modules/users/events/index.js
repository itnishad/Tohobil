const { Result } = require('express-validator');
const ProfileModel = require('../model/profile.model')

module.exports = async function(app){

    const emitter = app.get('eventEmitter');

    emitter.on('createProfile', async(body)=>{

        try {
            const newProfile = await new ProfileModel(body);
            const userProfile = await newProfile.save();
        } catch (error) {
            console.log("Event Error")
            console.log(error);
        }    
    })
}