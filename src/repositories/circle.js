"use strict";

const db = require('../config/db_conn');
const {generateCurrentTime} = require('../helpers/time');

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

    let query_create_circle = `
        INSERT INTO circle
        (name, description, circle_avatar, admin_id, created_at)
        VALUES
        (?,?,?,?,?)
    `

    let values_create_circle = [
        DTO.name, DTO.description, DTO.filename, userDTO.id, generateCurrentTime()
    ]

    return new Promise(function(resolve, reject) {
        db.beginTransaction(function(err) {

            if (err) reject(err)

            db.query(query_create_circle, values_create_circle, function (error, result, fields) {

                if (error) {
                    db.rollback(function() {
                        reject(error)
                    })
                }

                let query_push_to_table_circle_member = `
                    INSERT INTO circle_member
                        (circle_id, user_id, created_at)
                    VALUES
                        (?,?,?)
                `
                let values_push_to_table_circle_member = [
                    result.insertId, userDTO.id, generateCurrentTime()
                ]

                db.query(query_push_to_table_circle_member, values_push_to_table_circle_member, function (error, result, fields) {
                    
                    if (error) {
                        db.rollback(function() {
                            reject(error)
                        })
                    }

                    let query_update_user_is_admin = `
                        UPDATE user
                        SET 
                            is_admin = true,
                            updated_at = ?
                        WHERE 
                            id = ?
                    `
                    
                    let values_update_user_is_admin = [
                        generateCurrentTime(), userDTO.id
                    ]

                    db.query(query_update_user_is_admin, values_update_user_is_admin, function (error, result, fields) {

                        if (error) {
                            db.rollback(function() {
                                reject(error)
                            })
                        }

                        db.commit(function (error) {
                            if (error) {
                                return db.rollback(function() {
                                    reject(error)
                                })
                            }
                            resolve(result)
                        })
                    })
                })
            })
        })
    })
}

exports.editCircleInfo = async function (DTO, userDTO) {

    let query_circle = `
        UPDATE circle
        SET
            description = ?,
            updated_at = ?
        WHERE 
            admin_id = ?
    `
    
    let values_circle = [
        DTO.description, generateCurrentTime(), userDTO.id
    ]

    return new Promise(function (resolve, reject) {
        db.query(query_circle, values_circle, function (err, rows, fields) {
            if (err) reject(err)
            resolve(rows)
        })
    })
}