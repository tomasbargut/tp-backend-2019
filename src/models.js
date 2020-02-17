const mongoose = require('mongoose');
const config = require('./config');
const Schema = mongoose.Schema

mongoose.connect(config.DBURI, { useNewUrlParser: true });

const userSchema = Schema({
    username: String,
    password: String,
    googleid: String
});

const messageSchema = Schema({
    content: String,
    emiter: { type: Schema.Types.ObjectId, ref: 'User'},
    receptor: { type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

const User = mongoose.model('users', userSchema);

const Message = mongoose.model('messages', messageSchema);

module.exports = {User, Message};