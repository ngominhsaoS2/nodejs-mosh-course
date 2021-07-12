const EventEmitter = require('events');

var url = 'http://mylogger.io/blog';

class Logger extends EventEmitter {
    log(message) {
        // Send a HTTP request
    
        // Then log the message
        console.log(message);
    
        // Raise an event names "messageLogged"
        this.emit('messageLogged', { id: 1, name: 'something', url: 'https://' }); 
    }
}

module.exports = Logger;