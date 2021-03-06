const express = require('express');
const passport = require('passport');
const cors = require('cors');
const { user, auth, api } = require('./api');

const app = express();

app.use(passport.initialize());
app.use(express.json());
app.use(cors())
app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', {session: false}), user);
app.use('/api', passport.authenticate('jwt', {session: false}), api);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
