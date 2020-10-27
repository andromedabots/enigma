const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  type: { type: String, required: true },
  // actions that the items do, only one is needed for an item
  action: {
    addShield: { type: Number, default: 0 }, // shield added to ship
    addHealth: { type: Number, default: 0 }, // health added to ship
    isWeapon: { type: Boolean, default: false}, // true if item is a weapon
    isArtifact: { type: Boolean, default: false}, // true if item is an artifact
    codeFile: {type: String}, // custom code file for an item
    log: {type: String} // console.log the value for test items
  },
  slots: {type: Number, default: 1},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema);