const express = require('express');
const router = express.Router();
const {Genre} = require('../models/genre')
const {Movie, validate} = require('../models/movie')
const  auth = require('../middleware/auth')

router.get('/', async (req, res) => {
    const movies = await Movie.find()
        .sort('name');
    res.send(movies);    
});

router.post('/', auth, async (req, res) => {

    const {error}  = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send('invalid genre Id')
    // create a genre object using the model

    const movie = new Movie({ // _id for movie is created here by the driver
        title: req.body.title,
        genre:{
            _id:genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    });
    try {
        await movie.save() // returns the movie document
    } catch(err){
        return res.status(404).send(err.message)
    }
    res.send(movie);
});


// update database document
router.put('/:movieId', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('invalid genre ID')

    // params is :id
    const movie = await Movie.findByIdAndUpdate(req.params.movieId,{
        title: req.body.title,
        genre:{
            _id:genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    },{
        new: true // return the updated document
    })

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('The customer with the given ID was not found.');
    // return the same genre to client
    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const Movie = await Customer.findById(req.params.id);
    if (!Movie) return res.status(404).send('The customer with the given ID was not found.');
    res.send(Movie);
});




module.exports = router;