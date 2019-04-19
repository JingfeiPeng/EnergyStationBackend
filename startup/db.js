const mongoose = require('mongoose')
const winston = require('winston')

module.exports = function (){
    mongoose.connect('mongodb://localhost/EnergyStation') // this is a connection string
    .then(()=> winston.info('Connected to MongoDB'))
    // errors caught by winston in index.js
}