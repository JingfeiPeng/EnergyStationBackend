const express = require('express')
const error =  require('../middleware/error')
const ESuser = require('../routes/ESUser')
const ESauth = require('../routes/ESauth')
const ESgetUserActivitiesList = require('../routes/ESmainpulateActivityList')
const ESgetFriendList = require('../routes/ESfriendList')

module.exports = function(app){
    app.use(express.json());
    app.use('/energyStation/users', ESuser)
    app.use('/energyStation/ESauth', ESauth)
    app.use('/energyStation/activities',ESgetUserActivitiesList)
    app.use('/energyStation/friendLists', ESgetFriendList)
    // Error handling funciton
    app.use(error) // passing a reference to the function
}