"use strict";

const db = require('../config/db_conn');
const {generateCurrentTime} = require('../helpers/time');

exports.addItem = async function (DTO, userDTO) {
    
    let query = `
        INSERT INTO item (user_id, name, description, quantity, price, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            updated_at = ?
    `

    let values = [
        userDTO.id, DTO.name, DTO.description,
        DTO.quantity, DTO.price, generateCurrentTime(),
        generateCurrentTime()
    ]
    

    return new Promise(function(resolve, reject) {
        db.query(query, values, function(error, rows, fields) {
            if (error) reject(error)
            resolve(rows);
        })
    })
}