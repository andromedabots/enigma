const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    system: { type: String, required: true },
    type: { type: String, required: true },
    material: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema);