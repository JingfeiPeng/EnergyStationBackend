const express = require('express');
const router = express.Router();
const { ActivityList, validate } = require('../models/ESactivityList')
const  auth = require('../middleware/auth')
const admin = require('../middleware/admin')

// get the activities list of an user
router.get('/',auth, async (req,res)=>{
    const list = await ActivityList.find({accountEmail:req.user.email})
    .select({ActivityList: 1,_id:0})
    //or do .select('ActivityList -_id')
    .limit(1)
    // get the activity list directly
    res.send(list[0].ActivityList)
})

// insert an activity
router.post('/',auth,async (req,res)=>{
    // validate body
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let listObj = await ActivityList.find({accountEmail:req.user.email})
    listObj = listObj[0]
    // insert the new activity object
    listObj.ActivityList.push(req.body);
    listObj.save()
    res.send(listObj.ActivityList)
})

// Delete an activity
router.delete('/:id', auth, async (req,res)=>{
    //req.params.id
    let listObj = await ActivityList.find({accountEmail:req.user.email})
    listObj = listObj[0]
    // insert the new activity object
    listObj.ActivityList = listObj.ActivityList.filter((element)=>{
        return element._id != req.params.id
    })
    listObj.save()
    res.send(listObj.ActivityList)
})


// update database document
router.put('/:id', auth,async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let listObjGeneral = await ActivityList.find({accountEmail:req.user.email})
    listObjGeneral = listObjGeneral[0]
    let listObj = listObjGeneral.ActivityList;
    // find the index of change 
    let targetIndex = -1;
    for (let i = 0; i < listObj.length; i++){
        if (listObj[i]._id == req.params.id){
            targetIndex = i;
        }
    }
    if (targetIndex == -1) return res.status(404).send('The activity with the given ID was not found.');
    listObj[targetIndex] = {
        complete: req.body.complete? req.body.complete : listObj[targetIndex].complete,
        _id: listObj[targetIndex]._id,
        ...req.body
    }
    listObjGeneral.save()
    res.send(listObj);
});


module.exports = router