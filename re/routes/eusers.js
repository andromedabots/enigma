const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: { type: String, unique: true }, //user id
  location: {type: String, default: "dreared"}, //star system location
  faction: {type: String, default: ""}, //faction
  travel: {type: Boolean, default: false}, //warping or jumping
  balance: {type: Number, default: 12000} //currency balance
});

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema);