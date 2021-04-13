"use strict";

const db = require('../config/db_conn');

exports.register = async function (DTO) {

    let query = "INSERT INTO user(email, password, is_admin, username) values(?,?,?,?)"

    let values = [
        DTO.email, DTO.password, 0, DTO.username
    ];

    return new Promise(function(resolve, reject) {
        db.query(query, values, function(error, rows, fields) {
            if (error) reject(error);
            resolve(rows);    
        });
    });
}

exports.checkUserByEmail = async function (DTO) {

    let query = "SELECT * FROM user WHERE email = ?";

    return new Promise(function(resolve, reject) {
        db.query(query, DTO, function(error, rows, fields){
            if (error) reject(error);
            resolve(rows);
        });
    });
}