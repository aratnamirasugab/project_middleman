"use strict";

const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "middleman",
    multipleStatements : true
});

// const con = mysql.createConnection({
//     host : "us-cdbr-east-03.cleardb.com",
//     user: "be9afa0b8c3d9f",
//     password: "74b0db4e",
//     database: "heroku_227f99b4a734a11",
//     multipleStatements : true
// });

module.exports = con;