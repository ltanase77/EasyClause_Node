const mongoose = require("mongoose");
const clauseSchema = new mongoose.Schema({
    name: String,
    value: String,
});
const categorySchema = new mongoose.Schema({
    "clauses": [clauseSchema],
    "type": String,
    "typeValue": String

})
const typesSchema = new mongoose.Schema({
    lang: String,
    content: [categorySchema],
});

module.exports = mongoose.model("Types", typesSchema);
