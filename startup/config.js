const config = require('config')

module.exports = function(){
    /*
    {
        "jwtPrivateKey":"vidly_jwtPrivateKey"
    } in custom-environment-variables.json is the mapping, actual environment variable is called vidly_jwtPrivateKey
    default.json is a template for all the config variables in application. Not really affecting anything
    */
    if (!config.get('jwtPrivateKey')){ // private key is set in termial using "set jwtPrivateKey=xxx"
        throw new Error("JWT private key is not defined");
        // process.exit(1) // 0 is success, 1 is success   
    }

}