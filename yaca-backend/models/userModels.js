// here we are going to add mongoose schema
//that will be used in our database
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});
// The next thing is to export the user schema
module.exports = mongoose.model('User', userSchema);
