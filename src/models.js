const mongoose = require('mongoose');
const config = require('./config');


mongoose.connect(config.DBURI, { useNewUrlParser: true });

const User = mongoose.model('users', {
    username: String,
    password: String,
    googleid: String
});

const Message = mongoose.model('messages', {
    content: String,
    emiter: String,
    receptor: String
});

module.exports = {User, Message};