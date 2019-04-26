const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next){ //next goes to the next middleware
    const token = req.header('x-auth-token');
    // console.warn("The Token got: "+token)
    if (!token) return res.status(401).send('Access Denied. No token provided'); //401 is unauthorized
    // The request has not been applied because it lacks valid authentication credentials for the target resource.
    try{
        var prviateKey = config.get('jwtPrivateKey');
        const decoded = jwt.verify(token, prviateKey)
        req.user = decoded;
        next() // goes to the next part of the pipeline
    } catch(ex){
        res.status(400).send("Invalid Token.")  // 400 is bad request
    }

} 

