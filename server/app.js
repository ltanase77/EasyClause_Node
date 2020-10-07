const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res, next) => {
    const options = {
        //root: path.join(__dirname, "/client/dist/"),
        root: path.join(path.dirname(require.main.filename), "client/dist"),
    };
    res.sendFile("index.html", options);
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
