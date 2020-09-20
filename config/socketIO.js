let config = (io) => {
    let messages = [
        {user: 'Admin', message: 'Hello my friend...'},
        {user: 'Admin', message: 'Enjoy the chat.'}
    ];

    io.on('connection', socket => {
        console.log('Conectado', socket.id);
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.emit('previousMessages', messages);

        socket.on('chatMessage', (user, message) => {
            let result = {user: user, message: message};
            messages.push(result);
            socket.broadcast.emit('receivedMessage', result);
        });
    });
};

module.exports = {config};