const express = require('express');
const passport = require('passport');
const auth = require('./auth');
const user = require('./user');

const app = express();

app.use(passport.initialize());
app.use(express.json());
app.use('/auth', auth);
app.use('/user', user);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
