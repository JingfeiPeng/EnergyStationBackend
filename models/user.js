const mongoose = require('mongoose')
const Joi = require('joi');
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean,
    // roles:[],
    // operations:[{
    //     // create genre, delete genre
    // }]
});

userSchema.methods.generateAuthToken = function(){ // can't use => function, as => doesn't have their own this, this in => functions reference to the calling funciton
    return jwt.sign({ _id: this._id,isAdmin: this.isAdmin}, config.get("jwtPrivateKey"))
}

// create a model
const User = mongoose.model('user', userSchema)



function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required() // password before hash
    };

    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;