const mongoose = require("mongoose");

const DishifySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },


  contactName: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },


  Address  : {
    type: String,
    required: true,
  },
  

  email: {
    type: String,
    required: true,
    unique: true,
  },


  password: {
    type: String,
    required: true,
  },
});



const DishifyModel = mongoose.model("dishifypartner", DishifySchema);

module.exports = DishifyModel;
