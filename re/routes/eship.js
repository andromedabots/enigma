const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  id: { type: String },
  health: { type: Number },
  slots: { type: Number },
  speed: { type: Number },
  hidden: { type: Boolean, default: false}
});

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema);