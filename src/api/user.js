const express = require('express');
const passport = require('passport');
const {UserService, MessageService} = require('../services');

const userService = new UserService();
const messagesService = new MessageService();
const userRouter = express.Router();

userRouter.get('/me', async (req, res) => {
    return  res.json(req.user);
});

userRouter.get('/', async (req,res) => {
    const users = await userService.find(req.params);
    if(!users){
        return res.status(404).send('Not found');
    }
    return res.status(200).json(users);
})

userRouter.get('/:userid', async (req, res) => {
    const user = await userService.getOneById(req.params.userid);
    if(!user) {
        return res.status(404).send('Not found');
    }
    try {
        
    } catch (error) {
        
    }
    const messages = await messagesService.findByReceptor(req.user, user); 
    return res.status(200).json({user, messages});
})

module.exports = userRouter