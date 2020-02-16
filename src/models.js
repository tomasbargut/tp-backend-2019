const mongoose = require('mongoose');
const config = require('./config');
const Schema = mongoose.Schema

mongoose.connect(config.DBURI, { useNewUrlParser: true });

const userSchema = Schema({
    username: String,
    password: String,
    googleid: String,
    posts: [{postId: {type: Schema.Types.ObjectId, ref: 'Post'},
        post: {type: String},
        created: { type: Date, default: Date.now()}}]
});

const messageSchema = Schema({
    content: String,
    emiter: { type: Schema.Types.ObjectId, ref: 'User'},
    receptor: { type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

const postSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    username: {type: String, default: ''},
    post: {type: String, default: ''},
    comments: [{userId: {type: Schema.Types.ObjectId, ref: 'User'},
    username: {type: String, default: ''},
    comment: {type: String, default: ''},
    createdAt: {type: Date, default: Date.now()}}],
    totalLikes: {type: Number, default: 0},
    likes: [{username: {type: String, default: ''}}],
    created: {type: Date,default: Date.now()}
});


const User = mongoose.model('users', userSchema);

const Message = mongoose.model('messages', messageSchema);

const Post = mongoose.model('posts', postSchema);

module.exports = {User, Message, Post};