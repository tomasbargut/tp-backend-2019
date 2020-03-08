const config = require('./config');
const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { ExtractJwt } = require('passport-jwt');
const JWTStrategy = require('passport-jwt').Strategy;
const { UserService } = require('./services');

const userService = new UserService();

passport.use(new BasicStrategy(
    async (username, password, done) => {
        const user = await userService.findOne({
            username: username,
            password: password
        });
        if(!user){
            return done(null, false);
        }
        return done(null, user);
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
}, async (jwt_payload, done) => {
    const user = await userService.getOneById(jwt_payload._id);
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}));

passport.use(new GoogleStrategy({
    clientID: config.GCLIENT_ID,
    clientSecret: config.GCLIENT_SECRET,
    callbackURL: config.GCALLBACK_URL
}, async (token, refreshToken, profile, done) => {
    let user = await userService.findOne({googleid: profile.id});
    if(!user) {
       user = await userService.create({username: profile.displayName, googleid: profile.id});
    }
    return done(null, user);
}));


module.exports = passport