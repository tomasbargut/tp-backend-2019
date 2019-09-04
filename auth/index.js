
const express = require('express');
const google = require('./google');

const auth = express();

auth.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

auth.use('/google', google);

module.exports = auth