const express = require('express');
const passport = require('passport');
const {UserService} = require('../services');

const userService = new UserService();
const userRouter = express.Router();

userRouter.get('/me', async (req, res) => {
    return res.json(req.user);
});

userRouter.get('/', async (req,res) => {
    const users = await userService.find(req.params);
    if(!users){
        return res.status(404).send('Not found');
    }
    return res.status(200).json(users);
})

module.exports = userRouter