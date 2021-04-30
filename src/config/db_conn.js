"use strict";

const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "middleman",
    multipleStatements : true
});

module.exports = con;