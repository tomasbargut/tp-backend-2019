const user = require('./user');
const auth = require('./auth');
const message = require('./message');
const post = require('./post');
const express = require('express');
const api = express.Router();

api.use('/message', message);
api.use('/post', post)

module.exports = {
    user, auth, api
}