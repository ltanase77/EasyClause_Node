const mongoose = require("mongoose");

const typesSchema = new mongoose.Schema({});

module.exports = mongoose.model("Types", typesSchema);
