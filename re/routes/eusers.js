const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: { type: String, unique: true }, //user id
  location: {type: String}, //star system location
  faction: {type: String, default: ""}, //faction
  travel: {type: Boolean, default: false}, //currently warping or jumping
  ship: {type: String, default: "federalvoyager"}, //ship currently in use (ship id)
  locale: {type: String, default: "en"}, //current locale
  balance: {type: Number, default: 12000}, //currency balance
  inventory: {
    ships: [{
      id: {type: String},
      health: { type: Number },
      slots: { type: Array, default: []},
      custom: {type: Boolean, default: false}
    }],
    items: [{
      id: {type: String},
      used: {type: Boolean, default: false},
      custom: {type: Boolean, default: false}
    }]
  }
});

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema);