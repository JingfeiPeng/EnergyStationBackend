const mongoose = require('mongoose')
const Joi = require('joi');

// create a model
const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold:{
      type: Boolean,
      default:false
    },
    name:{
        type: String,
        required:true,
        minlength:5,
        maxlength:50,
    },
    phone:{
        type: String,
        required:true,
        minlength:5,
        maxlength:50, // same standard for strings
    },
  }))

  function validateCustomers(customer) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(5).max(50).required(),
      isGold: Joi.boolean()
    };
  
    return Joi.validate(customer, schema);
  }
  

  module.exports.Customer = Customer
  exports.validate = validateCustomers