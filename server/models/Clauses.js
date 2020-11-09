const mongoose = require("mongoose");

const clausesSchema = new mongoose.Schema({
    name: String,
    content: Array
});

module.exports = mongoose.model("Clauses", clausesSchema);
