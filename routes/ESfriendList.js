const express = require('express');
const router = express.Router();
const {FriendList,validateFriend} = require('../models/ESfriendlist')
const  auth = require('../middleware/auth')


// get the friend list of an user
router.get('/friends',auth, async (req,res)=>{
    const list = await FriendList.find({listOwner:req.user.email})
    .select({friendList: 1,_id:0})
    //or do .select('ActivityList -_id')
    // get the activity list directly
    res.send(list)
})

// sending a friendRequest
// send a friend request, get the sender from JWT, get target of send request from req.body.sentTo
router.post('/sendRequest', auth, async(req,res)=>{
    // get the target's friendlist
    const { error } = validateFriend(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const listObj = await FriendList.findOne({listOwner: req.body.sentTo});
    if (!listObj) return res.status(400).send("target user does not exist")
    let list = listObj.friendList;
    for (let i = 0; i < list.length;i++){
        if (list[i].sentBy == req.user.email){
            return res.status(400).send('Already sent request');
        }
    }

    listObj.friendList.push({
        sentBy: req.user.email,
    })
    let result = await listObj.save();
    res.send(result)  
})

// Accepting or Rejecting a friend Request



module.exports = router;