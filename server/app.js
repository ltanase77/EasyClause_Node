const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();
require("./db");
const Clauses = require("./models/Clauses");
const Types = require("./models/Types");

// Global middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    const options = {
        //root: path.join(__dirname, "/client/dist/"),
        root: path.join(path.dirname(require.main.filename), "client/dist"),
    };
    res.sendFile("index.html", options);
});

app.get("/clauses/:label", (req, res, next) => {
    const label = req.params.label;
    Clauses.findOne({ name: label })
        .then((clause) => {
            res.status(200).json(clause);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
            console.log(err);
        });
});

app.get("/types", (req, res, next) => {
    Types.find()
        .then((types) => {
            res.status(200).json(types);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
            console.log(err);
        });
});

app.post("/add-type", (req, res, next) => {
    const language = req.body.lang;
    const type = req.body.type;
    const value = req.body.value;
    console.log(req.body.lang);
    Types.updateOne({ lang: language }, { $push: {"content": { clauses: [], type: type, typeValue: value } }})
        .then((result) => {
            console.log(result);
            res.status(200).json({"msg": "success"});
        })
        .catch((err) => {
            res.status(500).json({ error: err });
            console.log(err);
        });
});

app.get("/500", (req, res, next) => {
    res.status(500).send("A aparut o eroare");
});

app.use(
    express.static(
        path.join(path.dirname(require.main.filename), "/client/dist")
    )
);

app.use((err, req, res, next) => {
    console.log(err);
    res.redirect("/500");
});

module.exports = app;
