const mongoose = require("mongoose");
const Joi = require("joi");

/*
    activityName:'Excercise',
    energyPtr:10,
    length:'20',
    hour: '12',
    minute: '30',
    type: Excercise,
    complete: false,
*/
const enumActTypes = ["Excercise", "Healthy Lifestyle", "Play", "study"];

const ActivitySchema = new mongoose.Schema({
  activityName: {
    type: String,
    required: true,
  },
  energyPtr: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  length: {
    type: Number,
    required: true,
    min: 0,
  },
  startTime: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: enumActTypes,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

const ActivityListSchema = new mongoose.Schema({
  accountEmail: {
    type: String,
    required: true,
  },
  ActivityList: {
    type: [ActivitySchema],
    default: [],
  },
});

const ActivityList = mongoose.model("ActivityList", ActivityListSchema);

// make sure JWT-Token is Valid
// valdidates a single Activity
function validateActivity(Activity) {
  const schema = {
    activityName: Joi.string().min(2).max(50).required(),
    energyPtr: Joi.number().min(0).max(40).required(),
    length: Joi.number().min(0).required(),
    startTime: Joi.string().min(0).max(10).required(),
    type: Joi.string().valid(enumActTypes).required(), // make sure enum is right
    complete: Joi.bool(),
    _id: Joi.string(),
    // Joi.objectIdValdiate().required(),  // client only send id
  };
  return Joi.validate(Activity, schema);
}

module.exports.ActivitySchema = ActivitySchema;
module.exports.ActivityList = ActivityList;
module.exports.validate = validateActivity;
