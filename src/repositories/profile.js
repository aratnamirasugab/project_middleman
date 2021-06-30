"use strict";

const db = require('../config/db_conn');

exports.addPhoneNumber = async function (DTO, userDTO) {

    let query = `
        INSERT INTO user_detail (user_id, phone_number)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE 
            phone_number = ?
    `
    
    let values = [
        userDTO.id, DTO.phone_number,
        DTO.phone_number
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
        ) VALUES (
            ?,?
        )
        ON DUPLICATE KEY 
        UPDATE
            address = ?
    `

    let values = [
        userDTO.id, DTO.address,
        DTO.address
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
            ?,?
        )
        ON DUPLICATE KEY
        UPDATE
            avatar = ?
    `

    let values = [
        userDTO.id, DTO.filename,
        DTO.filename
    ];

    return new Promise(function(resolve, reject) {
        db.query(query, values, function(error, rows, fields) {
            if (error) reject(error)
            resolve(rows);
        })
    })
}

exports.getProfileInfo = async function (userDTO) {

    let result = {}

    let query_profile = `
        SELECT
            u.id, u.name, u.email, u.is_admin,
            u.username, u.created_at as registered_on
        FROM
            user u
        WHERE u.id = ?;
    `

    let query_profile_detail = `
        SELECT
            ud.address, ud.phone_number, ud.avatar

        FROM
            user_detail ud
        WHERE 
            ud.user_id = ?;
    `

    let query_circle_member = `
        SELECT
            cm.circle_id, cm.created_at as joined_on
        FROM
            circle_member cm
        WHERE
            cm.user_id = ?
            AND
            cm.deleted_at is null
    `

    let query_circle = `
        SELECT
            c.name as circle_name, c.admin_id
        FROM
            circle c
        WHERE
            c.id = ?
            AND
            c.deleted_at is null
    `

    let query_circle_total_member = `
        SELECT COUNT(cm.user_id) as total_member
        FROM
            circle_member cm
        WHERE
            cm.circle_id = ?
            AND
            cm.deleted_at is null
    `

    let values_profile = [
        userDTO.id
    ]
    
    return new Promise(function(resolve, reject) {
        db.query(query_profile, values_profile, function(error, rows, fields) {
            if (error) reject(error)
            
            Object.assign(result, rows[0])

            let values_profile_detail = [
                result.id
            ]

            db.query(query_profile_detail, values_profile_detail, function(error, rows, fields) {
                if (error) reject(error)
                Object.assign(result, rows[0])

                let values_circle_member = [
                    userDTO.id
                ]
                
                db.query(query_circle_member, values_circle_member, function(error, rows, fields) {
                    if (error) reject(error)
                    Object.assign(result, rows[0])

                    let values_circle = [
                        result.circle_id
                    ]
                    
                    db.query(query_circle, values_circle, function(error, rows, fields) {
                        if (error) reject(error)
                        Object.assign(result, rows[0])
                        
                        let values_circle_total_member = [
                            result.circle_id
                        ]

                        db.query(query_circle_total_member, values_circle_total_member, function(error, rows, fields) {
                            if (error) reject(error)
                            Object.assign(result, rows[0])
                            resolve(result)
                        })
                    })
                })
            })         
        })
    })
}