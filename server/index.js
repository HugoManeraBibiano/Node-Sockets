const express = require('express');
const readline = require('readline');
const socketIo = require('socket.io');

const app = express();
const server = require('http').Server(app);

const io = socketIo(server);
io.on('connection', (socket) => {
    console.log('Usuario logado: ' + socket.id);

    socket.emit('messages', 'Seja bem-vindo!');

    socket.on('messages', (message) => {
        console.log('Client says: ' + message);

        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Server says: ', (answer) => {
            socket.emit('messages', answer);

            rl.close();
        });
    });

    socket.on('disconnect', () => {
        console.log('O usuario deslogou: ' + socket.id);
    });
});
server.listen(3000);