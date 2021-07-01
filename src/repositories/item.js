"use strict";

const db = require('../config/db_conn');
const {generateCurrentTime} = require('../helpers/time');

exports.addItem = async function (DTO, userDTO) {
    
    let query_item = `
        INSERT INTO item (
            user_id, name, description, quantity, price, created_at
        )
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY 
        UPDATE
            user_id = ?,
            name = ?,
            description = ?,
            quantity = ?,
            price = ?,
            updated_at = ?
    `

    let values_item = [
        userDTO.id, DTO.name, DTO.description,
        DTO.quantity, DTO.price, generateCurrentTime(),

        
        userDTO.id, DTO.name, DTO.description, DTO.quantity,
        DTO.price, generateCurrentTime()
    ]

    return new Promise(function(resolve, reject) {
        db.beginTransaction(function (err) {
            
            if (err) reject(err)

            db.query(query_item, values_item, function (error, results, fields) {
    
                if (error) {
                    db.rollback(function() {
                        reject(error)
                    })
                }
    
                let query_item_image = `
                    INSERT INTO item_image (
                        item_id, name_file, created_at
                    )
                    VALUES (
                        ?, ?, ?
                    )
                    ON DUPLICATE KEY
                    UPDATE
                        item_id = ?,
                        name_file = ?,
                        updated_at = ?
                `
    
                let values_item_image = [
                    results.insertId, DTO.filename, generateCurrentTime(),
                    results.insertId, DTO.filename, generateCurrentTime()
                ]
                
                
                db.query(query_item_image, values_item_image, function (error, results, fields) {
        
                    if (error) {
                        db.rollback(function() {
                            reject(error)
                        })
                    }
                    
                    db.commit(function(error) {
                        if (error) {
                            return db.rollback(function() {
                                reject(error)
                            })
                        }
                    })
                    resolve(results);
                })
            })
        })
    })
}

exports.getAllItem = async function (userDTO) {
    
    let query = `
        SELECT *
        FROM item i
        WHERE
            i.user_id = ?
    `

    let values = [
        userDTO.id
    ]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function (error, result, fields) {
            if (error) reject(error);
            resolve(result)
        })
    })
}

exports.deleteItem = async function (paramDTO) {
    
    let query_item = `
        DELETE FROM item
        WHERE
            id = ${paramDTO.id}
    `

    let query_item_image = `
        DELETE FROM item_image
        WHERE
            item_id = ${paramDTO.id}
    `

    return new Promise(function(resolve, reject) {
        db.query(query_item, function (error, rows, fields) {

            if (error) reject(error)

            db.query(query_item_image, function (error, rows, fields) {

                if (error) reject(error)

                resolve(rows)
            })
        })
    })
}

exports.getItemPictureAddress = async function (id) {

    let query = `
        SELECT name_file
        FROM
            item_image
        WHERE
            item_id = ?
    `

    let values = [id]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function (error, result, fields) {
            if (error) reject(error);
            resolve(result[0].name_file)
        })
    })
}