const mongoose = require('mongoose')
const winston = require('winston')

const URL = `mongodb+srv://${process.env.appusername}:${process.env.password}@cluster0-vpsfv.mongodb.net/energystation?retryWrites=true&w=majority`;
// local: 'mongodb://localhost/EnergyStation'

module.exports = function (){
    mongoose.connect(URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }) // this is a connection string
    .then(()=> winston.info('Connected to MongoDB'))
    // errors caught by winston in index.js
}