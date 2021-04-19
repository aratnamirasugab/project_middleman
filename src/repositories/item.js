"use strict";

const db = require('../config/db_conn');
const {generateCurrentTime} = require('../helpers/time');

exports.addItem = async function (DTO, userDTO) {
    
    let query_item = `
        INSERT INTO item (user_id, name, description, quantity, price, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
    `

    let values_item = [
        userDTO.id, DTO.name, DTO.description,
        DTO.quantity, DTO.price, generateCurrentTime()
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
                    INSERT INTO item_image (item_id, name_file, created_at)
                    VALUES (?, ?, ?)
                `
    
                let values_item_image = [
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