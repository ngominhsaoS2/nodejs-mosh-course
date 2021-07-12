const EventEmitter = require('events');
const Logger = require('./logger');

const logger = new Logger();

// Register a listener
logger.on('messageLogged', (arg) => {
    console.log('Message just got logged', arg);
});

logger.log('Some massage');
