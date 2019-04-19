const express = require('express');
const router = express.Router();
const {Genre, validateGenre } = require('../models/genre')
const  auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.post('/',auth,  (async (req, res) => { // execute auth before route handle

  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // create a genre object using the model
  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save() // get the id after saved
  res.send(genre);
}));

// update database document
router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  const genre = await Genre.findByIdAndUpdate(req.params.id,{
    name: req.body.name
  },{
    new: true // return the updated document
  })

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => { // an array of middleware functions, first auth then admin
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  // return the same genre to client
  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});


module.exports = router;