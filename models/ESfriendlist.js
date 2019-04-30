const mongoose = require('mongoose')
const Joi = require('joi');


const FriendRequestSchema = new mongoose.Schema({
    sentBy:{
        type: String,
        required: true,
    },
    accept:{
        type: Boolean,
        default:false
    }
})

const FriendListSchema = new mongoose.Schema({
    listOwner:{
        type: String,
        required:true,
    },
    friendList: {
        type:[FriendRequestSchema],
        default: []
    }
})

const FriendList = mongoose.model('FriendList', FriendListSchema);



// valdidates a single friend Request
function validateFriend(req){
    const schema = {
        sentTo: Joi.string().min(1).max(100).required(),
        accept: Joi.boolean()
    }
    return Joi.validate(req,schema);
}

module.exports.FriendList = FriendList;
module.exports.validateFriend = validateFriend;