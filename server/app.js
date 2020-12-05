const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const typesRoutes = require("./routes/types");
const clausesRoutes = require("./routes/clauses");

const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to load the single page application
app.get("/", (req, res, next) => {
    const options = {
        //root: path.join(__dirname, "/client/dist/"),
        root: path.join(path.dirname(require.main.filename), "client/dist"),
    };
    res.sendFile("index.html", options);
});

// API routes
app.use(typesRoutes);
app.use(clausesRoutes);

// General handling error middleware
app.get("/500", (req, res, next) => {
    res.status(500).send("A aparut o eroare");
});

// Middleware for serving static files
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
