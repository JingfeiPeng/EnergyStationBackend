const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customers') // set to what is returned in this module then .Customer or .valdiate
const  auth = require('../middleware/auth')

router.get('/', async (req, res) => {
  const customers = await Customer.find()
    .sort('name');
  res.send(customers);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // create a genre object using the model
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  try {
    customer = await customer.save() // get the id after saved
    res.send(customer);
  } catch (err){
      console.log(err)
  }
});

// update database document
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  const customer = await Customer.findByIdAndUpdate(req.params.id,{
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  },{
    new: true // return the updated document
  })

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  // return the same genre to client
  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  res.send(customer);
});

module.exports = router;