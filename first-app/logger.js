console.log({ __filename, __dirname });

var url = 'http://mylogger.io/blog';

function log(message) {
    // Send a HTTP request

    // Then log the message
    console.log(message);
}

module.exports = log;