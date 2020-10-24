const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  type: { type: String, required: true },
  // actions that the items do, only one is needed for an item
  action: {
    addShield: { type: Number },
    log: {type: String} // console.log the value
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema);