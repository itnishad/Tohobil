/**
 * Auth passport Config
 * 
 * @by faysal
 * @since 1.0
 */

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require('../../users/model/user.model');

let options = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
}

const jwtStrategy = new JWTStrategy(options, async(jwtPayload, done)=>{
        
    try {

        const user = await User.findById(jwtPayload.id);
        if(user){
            // if (jwtPayload.iss) {
            //     user["issuer"] = jwtPayload.iss;
            //     console.log(user)
            // }
            if(jwtPayload.exp < Date.now() /1000){
                return done(null, false);
            }
            return done(null, user)
        }

        return done(null, false)

    } catch (error) {
        console.log(error)
        return done(error, false)
    }

})


passport.use(jwtStrategy);
