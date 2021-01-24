require("./../db");
const Clauses = require("./../models/Clauses");

exports.getClause = (req, res, next) => {
    const label = req.params.label;
    Clauses.findOne({ name: label })
        .then((clause) => {
            res.status(200).json(clause);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
            console.log(err);
        });
};

exports.getAllClauses = (req, res, next) => {
    Clauses.find({})
        .then((clauses) => {
            res.status(200).json(clauses);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
            console.log(err);
        });
};
exports.postClause = (req, res, next) => {};
exports.deleteCluase = (req, res, next) => {};
