const Joi  = require('joi')
Joi.objectIdValdiate = require('joi-objectid')(Joi) // it returned a function, so we pass a reference to joi module

module.exports = function(){
    const Joi  = require('joi')
    Joi.objectIdValdiate = require('joi-objectid')(Joi) // it returned a function, so we pass a reference to joi module
}