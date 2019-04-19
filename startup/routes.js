const express = require('express')
const error =  require('../middleware/error')
const genres = require('../routes/genres');
const customers = require('../routes/customers')
const movies = require('../routes/movies')
const users = require('../routes/users')
const rentals = require('../routes/rentals')
const auth = require('../routes/auth')
const ESuser = require('../routes/ESUserLogin')


module.exports = function(app){
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers)
    app.use('/api/movies', movies)
    app.use('/api/rentals', rentals)
    app.use('/api/users',users)
    app.use('/api/auth',auth)    
    app.use('/energyStation/users', ESuser)
    // Error handling funciton
    app.use(error) // passing a reference to the function
}