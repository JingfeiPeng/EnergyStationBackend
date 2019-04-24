const express = require('express')
const error =  require('../middleware/error')
const ESuser = require('../routes/ESUserRegister')
const ESauth = require('../routes/ESauth')
const ESgetUserActivitiesList = require('../routes/ESmainpulateActivityList')

module.exports = function(app){
    app.use(express.json());
    app.use('/energyStation/users', ESuser)
    app.use('/energyStation/ESauth', ESauth)
    app.use('/energyStation/activities',ESgetUserActivitiesList)
    // Error handling funciton
    app.use(error) // passing a reference to the function
}