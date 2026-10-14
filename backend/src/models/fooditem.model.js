const mongoose = require("mongoose");
const like = require("./likes.model");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  video: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  dishifyPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dishifypartner",
  },

likeCount:{
  type:Number,
  default:0
},


});

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;
