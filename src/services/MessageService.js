const {Message} = require('../models');
const UserService = require('./UserService');

const userService = new UserService();
module.exports = class MessageService {
    async findById(id, user) {
        const message = await Message.findById(id);
        return (message.emiter == user.id || message.receptor == user.id) ? message: null;  
    }

    async create(messageData) {
        const receptor = await userService.getOneById(messageData.receptor);
        if(!receptor) {
            return {err:"No existe el receptor", message: null};
        }
        messageData = {...messageData, date: Date()};
        const message = await Message.create(messageData);
        return {err: null, message};
    }
}