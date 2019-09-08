const express = require('express');

const message_router = express.Router();

message_router.get('/', async (req, res) => {
    res.send('Unos mensajes');
});

// TODO: Implementar
message_router.get('/:messageid', async (req, res) => {
    res.send('El mensage: ' + req.params.messageid);
})

// TODO: Implementar
message_router.post('/', async (req, res) => {
    const messageData = req.body;
    res.send('Creado');
});

module.exports = message_router;