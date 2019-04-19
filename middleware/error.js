const winston  = require('winston')

module.exports = function(err, req,res,next){
    // log the exception
    // winston.log('error',err.message);

    // or use this way to skip 'error'
    winston.error(err.message, err) // err to store the other error properties in meta data
    // Levels:
    // error
    // warn
    // info 
    // verbose
    // debug
    // silly

    res.status(500).send("Internal Server Error")
}