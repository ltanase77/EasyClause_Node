"use strict";
const mongoose = require("mongoose");
const config = require("./config");

mongoose.Promise = global.Promise;
let dbc;

if (config.ENV === "development") {
    dbc = config.DB_DEV;
} else {
    dbc = config.DB_PROD;
}

console.log(dbc);

mongoose.connect(dbc, {
    useNewUrlParser: true,
    useUnifiedTopology: true /* user: config.dbUser, pass: config.dbPassword */,
});

mongoose.connection
    .on("connected", function () {
        console.log(`Mongoose connection open on ${dbc}`);
    })
    .on("error", function (error) {
        console.log(`Connection error: ${error.message}`);
    });
