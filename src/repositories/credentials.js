"use strict";

const db = require('../config/db_conn');

exports.register = async function (DTO) {
    
}

exports.checkUserByEmail = async function (DTO) {

    let query = "SELECT * FROM user WHERE email = ?";

    return new Promise(function(resolve, reject) {
        db.query(query, DTO.email, function(error, rows, fields){
            if (error) reject(error);
            resolve(rows)
        })
    })
}