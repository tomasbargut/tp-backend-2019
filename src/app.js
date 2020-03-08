const express = require('express');
const passport = require('passport');
const cors = require('cors');
const http = require('http');
const {user,auth,api} = require('./api');

const app = express();

app.use(passport.initialize());
app.use(express.json());
app.use(cors())
app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', {
    session: false
}), user);
app.use('/api', passport.authenticate('jwt', {
    session: false
}), api);

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('test event', 'PUTO EL QUE LEE');
});

server.listen(3000, () => {
    console.log('Socket.io server is running on port 3000');
});