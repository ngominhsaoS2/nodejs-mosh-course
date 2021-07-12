const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register a listener
emitter.on('messageLogged', (arg) => {
    console.log('Message just got logged', arg);
});

// Raise an event names "messageLogged"
emitter.emit('messageLogged', { id: 1, name: 'something', url: 'https://' }); 