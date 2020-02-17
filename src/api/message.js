const express = require('express');
const { MessageService } = require('../services');

const message_router = express.Router();
const messageService = new MessageService();

message_router.get('/', async (req, res) => {
    res.json(await messageService.find(req.user, req.params));
});

// TODO: Implementar
message_router.get('/:messageid', async (req, res) => {
    const message = await messageService.findById(req.params.messageid, req.user);
    if(!message) {
        return res.status(401).send('Unauthorized');
    }
    return res.status(200).json(message);
})

message_router.put('/:messageid', async(req, res) => {
    // TODO: Implementar edicion de mensajes
})

// TODO: Implementar
message_router.post('/', async (req, res) => {
    const messageData = req.body;
    const {err, message} = await messageService.create({
        ...messageData,
        emiter: req.user.id
    });
    if(err) {
        return res.status(400).json(err);
    }
    return res.status(201).json(message);
});

module.exports = message_router;