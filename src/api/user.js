const express = require('express');
const passport = require('passport');

const userRouter = express.Router();

userRouter.get('/me', passport.authenticate('jwt', {session: false}), async (req, res) => {
    return res.json(req.user);
})

module.exports = userRouter