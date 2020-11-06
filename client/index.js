const socketIoClient = require('socket.io-client');
const readline = require('readline');
const client = socketIoClient('http://localhost:3000');


client.on('messages', (message) => {
    console.log('Server says: ' + message);

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('You say: ', (answer) => {
        client.emit('messages', answer);

        rl.close();
    });
});