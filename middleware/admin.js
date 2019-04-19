module.exports = function (req,res, next){
    // req.user is set by Auth
    if (!req.user.isAdmin){
        return res.status(403).send('Access Denied') // Forbidden
    }
    next();
}

// 401: unauthorized -> try to access but no valid JWT token, user can send a request again
// 403: Forbidden -> if JWT is valid, but no access to the resource: then 403 forbidden to tell user don't try again, u don't have access
