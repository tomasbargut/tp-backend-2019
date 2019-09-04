const express = require('express');
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require('passport');

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


const google_auth = express();
google_auth.get('/', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

google_auth.get('/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        console.log(req.user.token);
        req.session.token = req.user.token;
        res.cookie('token', req.session.token);
        res.redirect('/');
    }
);
    
module.exports = google_auth;