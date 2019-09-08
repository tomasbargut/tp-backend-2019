const { User } = require('../models');

module.exports = class UserService{

    findOne(userData) {    
        return this._filter(User.findOne(userData));;
    }

    getOneById(id) {
        return this._filter(User.findById(id));
    }

    async create(userData) { // FIXME: Muy complejo
        // TODO: Validation
        const user = await User.create(userData);
        return this.getOneById(user._id);
    }
    
    _filter(query) {
        return query.select('-password -__v');
    }

}
