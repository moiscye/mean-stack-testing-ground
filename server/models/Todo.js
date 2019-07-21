const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  done: Boolean
});

module.exports = mongoose.model("Todo", TodoSchema);
