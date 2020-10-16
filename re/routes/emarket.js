const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  seller: { type: String, required: true },
  price: { type: Number, required: true },
  item: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema);