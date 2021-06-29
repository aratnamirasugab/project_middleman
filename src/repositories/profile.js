"use strict";

const db = require('../config/db_conn');
const {generateCurrentTime} = require('../helpers/time');

exports.addPhoneNumber = async function (DTO, userDTO) {

    let query = `
        INSERT INTO user_detail (user_id, phone_number)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            phone_number = ?
    `
    
    let values = [
        userDTO.id, DTO.phone_number, generateCurrentTime(),
        DTO.phone_number, generateCurrentTime()
    ]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function(error, rows, fields) {
            if (error) reject(error)
            resolve(rows);
        })
    })
}

exports.addAdress = async function (DTO, userDTO) {
    
    let query = `
        INSERT INTO user_detail (
            user_id, address
        VALUES (
            ?,?
        )
        ON DUPLICATE KEY 
        UPDATE
            address = ?
    `

    let values = [
        userDTO.id, DTO.address, generateCurrentTime(),
        DTO.address, generateCurrentTime()
    ]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function(error, rows, fields) {
            if (error) reject(error)
            resolve(rows);
        })
    })
}

exports.addProfilePicture = async function (DTO, userDTO) {

    let query = `
        INSERT INTO user_detail(
            user_id, avatar
        )
        VALUES(
            ?,?,?
        )
        ON DUPLICATE KEY
        UPDATE
            avatar = ?
    `

    let values = [
        userDTO.id, DTO.filename, generateCurrentTime(),
        DTO.filename, generateCurrentTime()
    ];
    
    return new Promise(function(resolve, reject) {
        db.query(query, values, function(error, rows, fields) {
            if (error) reject(error)
            resolve(rows);            
        })
    })
}

exports.getProfileInfo = async function (userDTO) {

    let query = `
        SELECT
            u.id, u.name, u.email, u.is_admin,
            u.username, u.created_at,
            ud.address, ud.phone_number,
            ud.avatar,
            c.name AS circle_name
        FROM
            user u
            INNER JOIN user_detail ud ON u.id = ud.user_id
            INNER JOIN circle_member cm ON cm.user_id = ?
            INNER JOIN circle c ON cm.circle_id = c.id
        WHERE u.id = ?;
    `

    let values = [
        userDTO.id, userDTO.id
    ]
    
    return new Promise(function(resolve, reject) {
        db.query(query, values, function(error, rows, fields) {
            if (error) reject(error)
            resolve(rows);            
        })
    })
}