const passport = require('../passport');
const express = require('express');
const { AuthService } = require('../services');

const authService = new AuthService();
const auth = express.Router();

auth.post('/login', passport.authenticate('basic', { session: false, }),
    async (req, res) => {
        const { user, token } = await authService.login(req.user);
        return res.status(201).json({ user, token });
    });

auth.post('/signup', async (req, res) => {
    const { user, token } = await authService.signUp(req.body);
    return res.status(201).json({ user, token });
});

auth.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

auth.get('/google/callback', passport.authenticate('google', { session: false }),
    async (req, res) => {
        const { user, token } = await authService.login(req.user);
        return res.redirect('/?token=' + token);
    }
);

module.exports = auth;