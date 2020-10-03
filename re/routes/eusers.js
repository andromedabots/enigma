const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: { type: String, unique: true }, //user id
  location: {type: String}, //star system location
  faction: {type: String, default: ""}, //faction
  travel: {type: Boolean, default: false}, //currently warping or jumping
  ship: {type: String, default: "federalvoyager"}, //ship currently in use (ship id)
  locale: {type: String, default: "en"}, //ship currently in use (ship id)
  balance: {type: Number, default: 12000} //currency balance
});

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema);