const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    system: { type: String },
    map: { type: String },
    warpTo: { type: Array },
    travelTo: { type: Array }
});

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema);