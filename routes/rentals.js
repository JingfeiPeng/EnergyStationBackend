const express = require('express')
const router = express.Router()
const {Rental,validate} = require('../models/rental')
const {Customer} = require('../models/customers')
const mongoose = require('mongoose')
const {Movie} = require('../models/movie')
const Fawn = require('fawn') // used for 2 phases commit
const  auth = require('../middleware/auth')


Fawn.init(mongoose)

router.get('/',async (req,res) =>{
    const rentals = await Rental.find().sort('-dateOut')
    res.send(rentals)
})


router.post('/',auth, async (req,res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    let customer;
    try {
        customer = await Customer.findById(req.body.customerId);
        if (!customer) return res.status(400).send('Customer not found with the id: '+req.body.customerId);
    } catch (err){
        res.status(400).send('Error: '+err);
    }
    // if (!mongoose.Types.ObjectId.isValid(req.body.movieId)) // Now done in Joi
    //     return res.status(400).send('Not valid movie id');
        
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) res.status(400).send('Movie not found with the id: '+req.body.movieId);

    console.log(movie)

    if (movie.numberInStock == 0) return res.status(400).send('Movie not in stock');

    let rental = new Rental({
        customer:{
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
        },
        movie:{
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        }
    })
    // try{
    //     rental = await rental.save();
    // } catch(err){
    //     res.status(400).send('Error: '+err);
    // }

    // movie.numberInStock--;
    // movie.save();
    try{
        new Fawn.Task() //creates a collection to perform two phase commit, hanlding exceptions at level 2 safty
            .save('rentals',rental) // actually name of collection, name is case sensitive
            .update('movies',
                {
                    _id: movie._id // identifier
                },{
                $inc: { // increment operator
                    numberInStock: -1,
                }
            })
            //.remove()
            .run();
    } catch(ex){
        res.status(500).send("Something failed when saving: "+ex)
    }

    res.send(rental);
})

router.get("/:rentalId",async (req,res)=>{
    let rental;
    try {
        rental  = await Rental.findById(req.params.rentalId);
    } catch(err){
        res.status(404).send(err)
    }

    if (!rental) return res.status(404).send(`Requested rental Id: ${req.params.rentalId} not found`);

    res.send(rental)
})



module.exports = router;