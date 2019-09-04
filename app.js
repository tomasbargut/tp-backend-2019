const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const auth = require('./auth');

const app = express();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user,done) => {
    done(null, user);
});

app.use(passport.initialize());
app.use(cookieSession({
    name: 'session',
    keys: ['SECRECT KEY'],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(cookieParser());

app.use('/auth', auth);

function auth_middleware(req, res, next) {
    if (req.session.token) {
        next();
    } else {
        res.status(401);
        res.end();
    }
}
app.get('/', auth_middleware, (req, res) => {
    res.json({
        hello: 'World'
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});