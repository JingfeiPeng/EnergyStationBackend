const winston = require('winston') // default logger
/* Winston has Transports: a storage device for logs
1: console, 2: file, 3: Http, call a http endpoint to log messages
1: mongoDB, 2: CouchDB 3: Redis, Loggly,
*/
require('winston-mongodb') // make winston able to log in mongodb
require('express-async-errors') // for using app.use(error), makes 


module.exports = function(){
    // // catch exceptions outside of express process by adding event listeners
    // // but it only works with sync codes
    // process.on('uncaughtException',(exception)=>{
    //     winston.error(exception.message,exception);
    //     process.exit(1);
    // })

    winston.handleExceptions(
        new winston.transports.Console({colorize: true,prettyPrint: true}),
        new winston.transports.File({filename:'UncaughtExceptions.log'}))

    process.on('unhandledRejection',(exception)=>{
        // winston.error(exception.message,exception)
        // // restart Node
        //  process.exit(1);
        throw exception;
    })
    
    
    winston.add(winston.transports.File , { filename: 'logfile.log'})
    winston.add(winston.transports.MongoDB, {db:'mongodb://localhost/vidly', level: 'error'}) // only logs error level messages
}


// if set to info, it will log Error, Warn, and Info but not anything below info like verbose, debug, silly 
