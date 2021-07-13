const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to Mongodb'))
    .catch(err => console.error('Could not connect to Mongodb: ', err));