const mongoose = require('mongoose');
const DBURI = process.env.MONGO_DBURI;
const USER = process.env.MONGO_USER;
const PWD = process.env.MONGO_PWD;

mongoose.connect(DBURI, { useNewUrlParser: true });

const User = mongoose.model('users', {
    username: String,
    password: String,
    googleid: String
});

module.exports.User = User;