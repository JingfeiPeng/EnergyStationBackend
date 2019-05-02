const express = require('express');
const router = express.Router();
const {FriendList,validateFriend,validateResponse} = require('../models/ESfriendlist')
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
    const { error } = validateFriend(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    // get the target's friendlist
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
    res.send(result)  // the returned listOwn can be used to display sent message
})

// Accepting or Rejecting a friend Request
// pass in { "sentBy":"xxx",accept:"true/false"}
router.put('/sendRequest/choose', auth, async (req, res) =>{
    // get the sender's friendList
    const { error } = validateResponse(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let ownerListObj = await FriendList.findOne({listOwner: req.user.email});
    const ownerList = ownerListObj.friendList;
    // find the request
    let request = ownerList.find((element) => element.sentBy == req.body.sentBy);
    if (req.body.accept == "true"){ // accepts the request
        request.accept = true
        // update the new friend on sender's friendlist object
        const senderListObj = await FriendList.findOne({listOwner: req.body.sentBy});
        let senderList = senderListObj.friendList;
        senderList.push({
            sentBy: req.user.email,
            accept: true
        });
        await senderListObj.save()
    } else { // rejects and delete the request
        let index = ownerList.findIndex(element => element.sentBy == request.sentBy)
        ownerList.splice(index, 1)
    }
    ownerListObj = await ownerListObj.save()
    res.send(ownerListObj)
})



module.exports = router;