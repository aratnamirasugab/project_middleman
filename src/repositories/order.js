"use strict";

const db = require('../config/db_conn');
const { generateCurrentTime } = require('../helpers/time');

exports.orderItem = async function(DTO, userDTO) {

    let query_order = `
        INSERT INTO
        middleman.order
        (
            buyer_id, seller_id, circle_id, shipping_address, 
            shipping_price, total_price, created_at 
        )
        VALUES(
            ?, ?, ?, ?,
            ?, ?, ?
        )
    `

    let values_order = [
        userDTO.id, DTO.seller_id, DTO.circle_id, DTO.shipping_address,
        DTO.shipping_price, DTO.total_price, generateCurrentTime()
    ];

    return new Promise(function(resolve, reject) {
        db.beginTransaction(function (err) {
            
            if (err) reject(err)

            db.query(query_order, values_order, function (error, results, fields) {

                if (error) {
                    db.rollback(function() {
                        reject(error)
                    })
                }
                
                let query_order_list = `
                    INSERT INTO order_list (
                        order_id, item_id, quantity, notes
                    )
                    VALUES (
                        ?, ?, ?, ?
                    )
                `

                for (let item of DTO.item_list) {
                    let values_order_list = [
                        results.insertId, item["item_id"], item["quantity"], item["notes"] 
                    ]

                    db.query(query_order_list, values_order_list, function (error, results, fields) {
            
                        if (error) {
                            return db.rollback(function() {
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
                }
            })
        })
    })
}

exports.getOrdersAsAdmin = async function (circle_id) {
    
    let query = `
        SELECT id, buyer_id, seller_id FROM middleman.order
        WHERE
            circle_id = ?
            AND
            approved_by_seller = 1
            AND
            deleted_at IS NULL
    `

    let values = [
        circle_id
    ]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function (error, result, fields) {
            if (error) reject(error);
            resolve(result)
        })
    })

}

exports.getOrderDetail = async function (order_id) {
    
    let query = `
        SELECT * FROM middleman.order_list
        WHERE
            order_id = ?
    `

    let values = [
        order_id
    ]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function (error, result, fields) {
            if (error) reject(error);
            resolve(result)
        })
    })

}

exports.getOrdersAsSeller = async function (circle_id) {
    
    let query = `
        SELECT id, buyer_id, seller_id FROM middleman.order
        WHERE
            circle_id = ?
            AND
            approved_by_seller IS NULL
            AND
            deleted_at IS NULL
    `

    let values = [
        circle_id
    ]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function (error, result, fields) {
            if (error) reject(error);
            resolve(result)
        })
    })
}

exports.approveOrderAsSeller = async function (DTO) {
    
    let query = `
        UPDATE middleman.order
        SET
            approved_by_seller = ?,
            updated_at = ?
        WHERE
            id = ?
            AND
            deleted_at IS NULL
    `

    let values = [
        DTO.value, generateCurrentTime(),
        DTO.order_id
    ]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function (error, result, fields) {
            if (error) reject(error);
            resolve(result)
        })
    })
}

exports.approveOrderAsAdmin = async function (DTO) {
    
    let query = `
        UPDATE middleman.order
        SET
            approved_by_admin = ?,
            updated_at = ?
        WHERE
            id = ?
            AND
            deleted_at IS NULL
    `

    let values = [
        DTO.value, generateCurrentTime(),
        DTO.order_id
    ]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function (error, result, fields) {
            if (error) reject(error);
            resolve(result)
        })
    })
}