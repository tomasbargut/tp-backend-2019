const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { ExtractJwt } = require('passport-jwt');
const JWTStrategy = require('passport-jwt').Strategy;
const {User} = require('./models');

passport.use(new BasicStrategy(
    async (username, password, done) => {
        const user = await User.findOne({
            username: username,
            password: password
        }).select('-password -_id')
        if(!user){
            return done(null, false);
        }
        return done(null, user);
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, async (jwt_payload, done) => {
    const user = await User.findOne(jwt_payload);
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GCLIENT_ID,
    clientSecret: process.env.GCLIENT_SECRET,
    callbackURL: process.env.GCALLBACK_URL
},async (token, refreshToken, profile, done) => {
    let user = await User.findOne({googleid: profile.id});
    if(!user) {
       user = await User.create({username: profile.displayName, googleid: profile.id});
    }
    return done(null, user);
}));


module.exports = passport