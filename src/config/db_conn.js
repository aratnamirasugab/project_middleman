"use strict";

const mysql = require('mysql');
const envs = require('../../config');

const con = mysql.createConnection({
    host: envs.DB_URI,
    user: envs.DB_USERNAME,
    password: envs.DB_PASSWORD,
    database: envs.DB_DEFAULT,
    multipleStatements : true
});

module.exports = con;