const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  id: { type: String },
  damage: { type: Number },
  attack_speed: { type: Number },
  health: { type: Number },
  shield: { type: Number },
  slots: { type: Number },
  speed: { type: Number }
});

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema);