const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { ExtractJwt } = require('passport-jwt');
const JWTStrategy = require('passport-jwt').Strategy;

passport.use(new BasicStrategy(
    (username, password, done) => {
        if (username == 'teddie' && password == "teddie") {
            return done(false, { username: 'teddie' })
        } else {
            return done(null, false);
        }
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, (jwt_payload, done) => {
    if (jwt_payload.username == 'teddie') {
        return done(null, { username: 'teddie' });
    } else {
        return done(null, false);
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GCLIENT_ID,
    clientSecret: process.env.GCLIENT_SECRET,
    callbackURL: process.env.GCALLBACK_URL
},(token, refreshToken, profile, done) => {
    return done(null, {
        profile: profile,
        token: token
    });
}));


module.exports = passport