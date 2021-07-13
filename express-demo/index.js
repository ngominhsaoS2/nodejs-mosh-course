const express = require('express');
const app = express();
const Joi = require('joi'); // this is a class
const logger = require('./middlewares/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const courses = require('./routes/courses');
const home = require('./routes/home');

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`); // will return "development" if NODE_ENV is undefined

app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

app.use('/', home);
app.use('/api/courses', courses);

// Configuration
console.log(`Application name: ${config.get('name')}`);
console.log(`Mail host: ${config.get('mail.host')}`);
console.log(`Mail password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('morgan enabled.');
}

// DB work...
dbDebugger('Connected to the database...');

app.use(logger);

app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
