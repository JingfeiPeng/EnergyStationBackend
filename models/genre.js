const mongoose = require('mongoose')
const Joi = require('joi');

// create a schema
const genreSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
})

// create a model
const Genre = mongoose.model('Genre', genreSchema)

  function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }

  module.exports.Genre = Genre;
  module.exports.GenreSchema = genreSchema;
  module.exports.validateGenre = validateGenre;