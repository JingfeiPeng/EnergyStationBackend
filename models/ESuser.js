// setup MongoDB model for users.

const mongoose = require('mongoose')
const Joi = require('joi');
const jwt = require('jsonwebtoken')
const config = require('config')

const ESuserSchema = new mongoose.Schema({
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
    energyPtr: {
        type: Number,
        default: 0
    },
    profilePic:{
        type:String,
        default:''
    },
    backgroundPic:{
        type: String,
        default: ''
    }
    // roles:[],
    // operations:[{
    //     // create genre, delete genre
    // }]
});

ESuserSchema.methods.generateAuthToken = function(){ 
    let privateKey = config.get("jwtPrivateKey") ? config.get("jwtPrivateKey") : 'StaticUnsafePrivateKey';
    console.log(privateKey)
    // can't use => function, as => doesn't have their own this, this in => functions reference to the calling funciton
    return jwt.sign({ _id: this._id, name: this.name,email: this.email}, privateKey)
}

// create a model
const ESUser = mongoose.model('ESuser', ESuserSchema)


function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required() // password before hash
    };

    return Joi.validate(user, schema);
}

module.exports.User = ESUser;
module.exports.validate = validateUser;