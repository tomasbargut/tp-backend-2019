const user = require('./user');
const auth = require('./auth');
const message = require('./message');
const express = require('express');
const api = express.Router();

api.use('/message', message);

module.exports = {
    user, auth, api
}