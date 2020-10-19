const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
require("./db");
const Clauses = require("./models/Clauses");
const Types = require("./models/Types");

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
            res.set("Access-Control-Allow-Origin", "*");
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
            res.set("Access-Control-Allow-Origin", "*");
            res.status(200).json(types);
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
