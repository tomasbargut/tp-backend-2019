const express = require('express');
const passport = require('passport');
const auth = require('./auth');

const app = express();

app.use(passport.initialize());
app.use('/auth', auth);

app.get('/', passport.authenticate('jwt', {session: false}), (req, res)=> {
    res.status(200);
    res.json(req.user);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
