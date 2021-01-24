require("./../db");
const Types = require("./../models/Types");

exports.getAllTypes = (req, res, next) => {
    Types.find()
        .then((types) => {
            res.status(200).json(types);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
            console.log(err);
        });
};

exports.addType = (req, res, next) => {
    const language = req.body.lang;
    const type = req.body.type;
    const value = req.body.value;
    console.log(req.body.lang);
    Types.updateOne(
        { lang: language },
        { $push: { content: { clauses: [], type: type, typeValue: value } } }
    )
        .then((result) => {
            console.log(result);
            res.status(200).json({ msg: "Success" });
        })
        .catch((err) => {
            res.status(500).json({ msg: "Fail", error: err });
            console.log(err);
        });
};

exports.deleteType = (req, res, next) => {
    const language = req.body.lang;
    const type = req.body.type;
    Types.updateMany(
        { lang: language },
        { $pull: { content: { typeValue: type } } }
    )
        .then((result) => {
            console.log(result);
            res.status(200).json({ msg: "Success" });
        })
        .catch((err) => {
            res.status(500).json({ msg: "Fail", error: err });
            console.log(err);
        });
};

exports.addClause = (req, res, next) => {};
exports.deleteClause = (req, res, next) => {};
