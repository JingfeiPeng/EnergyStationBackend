const _ = require('lodash')
const {User, validate } = require('../models/ESuser')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth') // authorization check if has permission

// get the current web user, passing in json webtoken in header.
router.get('/me', auth, async (req,res)=>{
    console.log('Its working')
    const user = await User.findById(req.user._id).select('-password'); // got it from Auth function
    res.send(user);
})


// log out => client log out => delete JWT on client side then client is logged out
// JWT tokens shouldn't be stored in database, if stored, should be encrypted
// use Https to when sending tokens from client to server

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email:req.body.email}); // findOne looks up uses by 1 of their properties
    if (user) return res.status(400).send('User already registered.')
    // can use Joi-password-complexity for checking if password is complex enough
    user = new User(_.pick(req.body, ['name','email','password'])) 
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt) //1234 is passowrd

    await user.save();
    // return JWT in HTTP header in response
    const token = user.generateAuthToken();// first paramter is payload, secret private key
    res.header('x-auth-token',token).send(_.pick(user, ['_id','name','email']))

    // use lodash, a powerful javascript library to deal with strings, arrays
    // res.send({
    //     name: user.name,
    //     email: user.email
    // });
});

// Information Expert Principle


module.exports = router