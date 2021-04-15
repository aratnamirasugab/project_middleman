"use strict";

const db = require('../config/db_conn');
const {generateCurrentTime} = require('../helpers/time');

exports.addPhoneNumber = async function (DTO, userDTO) {
    
    let query = `
        INSERT INTO user_detail (
            user_id,
            phone_number,
            created_at
        )
        SELECT * FROM (
            SELECT ?, ?, ?
        ) AS tmp
        WHERE NOT EXISTS (
            SELECT user_id FROM user_detail
            WHERE
                user_id = ?
        ) LIMIT 1
    `

    let values = [
        userDTO.id, DTO.phone_number, generateCurrentTime(), userDTO.id
    ]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function(error, rows, fields) {
            if (error) reject(error)
            resolve(rows);
        })
    })
}