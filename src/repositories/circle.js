"use strict";

const db = require('../config/db_conn')

exports.alreadyHasCircle = async function (userDTO) {
    
    let query_circle_member = `
        SELECT id
        FROM
            circle_member
        WHERE
            user_id = ?
        LIMIT 1
    `
    
    let values_circle_member = [
        userDTO.id
    ]

    return new Promise(function (resolve, reject) {
        db.query(query_circle_member, values_circle_member, function (err, rows, fields) {
            if (err) reject(err)
            resolve(rows)
        })
    })
}   

exports.createCircle = async function (DTO, userDTO) {


    return new Promise(function(resolve, reject) {
        db.beginTransaction(function(err) {
            if (err) reject(err)

            
            
        })

        
    })
}