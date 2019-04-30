const _ = require('lodash')
const {User, validate } = require('../models/ESuser')
const {ActivityList} = require('../models/ESactivityList')
const {FriendList} =  require('../models/ESfriendlist')
const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const Fawn = require('fawn') // used for 2 phases commit
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth') // authorization check if has permission

Fawn.init(mongoose)

// get the current web user, passing in json webtoken in header.
router.get('/me', auth, async (req,res)=>{
    const user = await User.findById(req.user._id).select('-password'); // got it from Auth function
    res.send(user);
})


// fetch users and display their key info.
router.get('/', async (req,res) =>{
    const users = await User.find().sort({energyPtr: -1}).select('_id name energyPtr profilePic backgroundPic');
    res.send(users)
})

// log out => client log out => delete JWT on client side then client is logged out
// JWT tokens shouldn't be stored in database, if stored, should be encrypted
// use Https to when sending tokens from client to server

// register
router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email}); // findOne looks up uses by 1 of their properties
    if (user) return res.status(400).send('User already registered.')
    // can use Joi-password-complexity for checking if password is complex enough
    user = new User(_.pick(req.body, ['name','email','password'])) 
    const salt = await bcrypt.genSalt(10) // 10 relates to secruity level
    user.password = await bcrypt.hash(user.password, salt) 

    // return JWT in HTTP header in response
    const activitylist = new ActivityList({accountEmail: req.body.email})

    const friendList =  new FriendList({listOwner: req.body.email});

    // await user.save();
    // await activitylist.save()
    // await friendList.save()

    // use mongoose two phase commit 
    try {
        new Fawn.Task() //creates a collection to perform two phase commit, hanlding exceptions at level 2 safety
            .save('esusers',user)
            .save('activitylists',activitylist)
            .save('friendlists',friendList)
            .run()
    }  catch(ex){
        res.status(500).send("Something failed when saving: "+ex)
    }

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