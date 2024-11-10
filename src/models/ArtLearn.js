const mongoose = require("mongoose");

const artLearnModelSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // assuming duration is in hours or minutes
    required: true,
  },
});
const artLearnModel = mongoose.model("artLearn", artLearnModelSchema);
module.exports = { artLearnModel };
