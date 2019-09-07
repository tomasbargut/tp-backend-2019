const express = require('express');
const { User } = require('./models');
const passport = require('passport');

const app = express();

app.get('/', passport.authenticate('jwt'), async (req, res) => {
    users = await User.find().select('-_id -password -__v');
    return res.json(users);
})

app.get('/:username', passport.authenticate('jwt'), async (req, res) => {
    const params = req.params;
    const user = await User.findOne({username: params.username})
                            .select('-_id -password');
    if(!user){
        return res.status(404).send();
    }
    return res.status(200).json(user);
});

app.post('/', async (req, res) => {
    const user_data = req.body
    const user = await User.findOne({username: user_data.username});
    if (user) {
        return res.status(400).json({ msg: 'Username taken' });
    }
    if (!user_data.password) {
        return res.status(400).json({ msg: 'Mising password' });
    }
    // TODO: Hash password
    await User.create(user_data);
    return res.status(201).json(user_data);
});


module.exports = app