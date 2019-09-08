const jwt = require('jsonwebtoken');
const config = require('../config');
const UserService = require('./UserService');

const userService = new UserService();

module.exports = class AuthSevice {
    constructor() { }

    async login(user) {
        const token = this._genereateToken(user)
        return { user, token }
    }

    async signUp(userData) {
        // TODO: Hash Password
        const user = await userService.create({
            ...userData
        });
        const token = this._genereateToken(user);
        return { user, token }
    }

    _genereateToken(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        const token = jwt.sign({
            _id: user._id,
            username: user.username,
            exp: exp.getTime() / 1000
        }, config.JWT_SECRET);

        return token;
    }
}
