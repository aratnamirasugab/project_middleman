"use strict";

const mysql = require('mysql');

const con = mysql.createConnection({
    host: "us-cdbr-east-03.cleardb.com",
    user: "be9afa0b8c3d9f",
    password: "74b0db4e",
    database: "heroku_227f99b4a734a11",
    multipleStatements : true
});

module.exports = con;

//mysql://be9afa0b8c3d9f:74b0db4e@us-cdbr-east-03.cleardb.com/heroku_227f99b4a734a11?reconnect=true