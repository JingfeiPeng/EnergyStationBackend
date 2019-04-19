const _ = require('lodash')
const {User } = require('../models/user')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const Joi = require('joi');

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required() // password before hash
    };

    return Joi.validate(req, schema);
}

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email:req.body.email}); // findOne looks up uses by 1 of their properties
    if (!user) return res.status(400).send('Invalid Email.')

    const validPassword = await bcrypt.compare(req.body.password,user.password) //handles the checking as well
    if (!validPassword) return res.status(400).send('Invalid Email or Password.')
    // return a JWT , a long string to identify the user
    /*
       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.VDWoDxng3f9S2CgXwxOUph93lAGjOUeo4SynpkVP1V4
        last bit contains secret value on server, so when the content is changed, the secret is changed, the request becomes invalid
    */
    const token = user.generateAuthToken();
    console.warn('Reached')
        /*
        {
        "_id": "5cae23e2791e6d1e68d7b697",
        "iat": 1554946659 // time that this token is created
        }
    */
    res.send(token) // valid login


});


module.exports = router