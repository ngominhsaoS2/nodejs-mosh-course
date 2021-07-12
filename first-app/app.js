const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register a listener
emitter.on('messageLogged', function() {
    console.log('Message just got logged');
});

// Raise an event names "messageLogged"
emitter.emit('messageLogged'); 