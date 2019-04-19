
const mongoose = require('mongoose')
const Joi = require('joi');
const {GenreSchema} = require('./genre')

const Movie = mongoose.model('Movie',new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength:255
    },
    genre: {
        type:GenreSchema,
        required: true
    },
    numberInStock:{
        type: Number,
        min:0,
        max:255,//characters Check this?
    },
    dailyRentalRate:{
        type:Number,
        required: true,
        min: 0,
        max:255
    }
}))

function validateMovie(Movie){
    const schema = {
        title:Joi.string().min(5).max(50).required(),
        genreId: Joi.objectIdValdiate().required(),  // client only send id
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }
    return Joi.validate(Movie, schema);
}

module.exports.Movie = Movie
module.exports.validate = validateMovie;