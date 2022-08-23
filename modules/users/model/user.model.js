/**
 * User Model
 * 
 * @by faysal
 * @since 1.0
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({

    name: {type: String, trim: true},

    email:{type: String, trim: true, require: true},

    password: {type:String , require:true}
    
}, { timestamps: true })

// var hash_password =  UserSchema.statics.hash_password =  function( password ) {
//     let salt = bcrypt.genSaltSync(); // enter number of rounds, default: 10
//     return bcrypt.hashSync( password, salt );
// };

UserSchema.pre("save", async function(next){
    if(this.isModified('password')){
        let salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
})

module.exports = new mongoose.model('User', UserSchema);