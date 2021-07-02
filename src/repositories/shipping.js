"use strict";

const db = require('../config/db_conn');

exports.getShippingLocation = async function () {
    
    let query = `
        SELECT * FROM shipping_address
    `

    return new Promise(function (resolve, reject) {
        db.query(query, function (err, rows, fields) {
            if (err) reject(err)
            resolve(rows)
        })
    })

}

exports.insertLocationsToDB = async function (DTO) {

    let query = `
        INSERT INTO shipping_address (
            city_id, province_id, province, 
            type, city_name, postal_code
        ) VALUES (
            ?,?,?,?,?,?
        )`;

    return new Promise(function(resolve, reject) {
        for (let i = 0 ; i < DTO.length ; i++) {

            let arr = [
                DTO[i].city_id, DTO[i].province_id, DTO[i].province,
                DTO[i].type, DTO[i].city_name, DTO[i].postal_code
            ];

            db.query(query, arr, function(error, rows, fields) {
                if (error) reject(error);
                resolve(rows);
            })
        }
    })
}