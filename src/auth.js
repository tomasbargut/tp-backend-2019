const passport = require('./passport');
const express = require('express');
const jwt = require('jsonwebtoken');

const auth = express();

auth.post('/login', passport.authenticate('basic', { session: false, }), (req, res) => {
    const token = jwt.sign(req.user, process.env.JWT_SECRET);
    res.status(200);
    res.json({ token: token });
})

auth.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

auth.get('/google/callback', passport.authenticate('google', {session: false}),
    (req, res) => {
        const token = jwt.sign(req.user, process.env.JWT_SECRET);
        res.redirect(`/?token=${token}`);
    }
);

module.exports = auth;