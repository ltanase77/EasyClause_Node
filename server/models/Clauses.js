const mongoose = require("mongoose");

const clausesSchema = new mongoose.Schema({});

module.exports = mongoose.model("Clauses", clausesSchema);
