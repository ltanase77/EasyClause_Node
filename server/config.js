"use strict";
const dotEnv = require("dotenv");
dotEnv.config();
const ENV = process.env.NODE_ENV;
const DB_DEV = process.env.DB_URI_DEV;
const DB_PROD = process.env.DB_URI_PROD;

const config = {
    ENV,
    DB_DEV,
    DB_PROD,
};

module.exports = config;
