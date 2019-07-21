const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const TalentSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50
  },
  currentJob: {
    type: String,
    required: true,
    maxlength: 50
  },
  company: {
    type: String,
    required: true,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    maxlength: 15
  },
  email: {
    type: String,
    required: true,
    maxlength: 50
  },
  experienceDescription: {
    type: String,
    required: true,
    maxlength: 200
  }
});

module.exports = mongoose.model("Talent", TalentSchema);
