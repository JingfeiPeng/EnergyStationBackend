const express = require('express');
const app = express();
const winston = require('winston')

// load env variables from .env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

require('./startup/logging')()
require('./startup/routes')(app) // we got a funciton
require('./startup/db')() // execute the function
require('./startup/config')
require('./startup/valdiation')

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));