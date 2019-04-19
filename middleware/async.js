module.exports = function asyncMiddleware(handler){ // returns an async function
    return async (req, res, next)=>{
        try{
          await handler(req, res);
        }
        catch(ex){
          next(ex)
        }
    }
  }