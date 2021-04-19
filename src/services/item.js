"use strict"

const repository = require('../repositories/item');

exports.addItem = async function (DTO, userDTO) {

    let resultFromDB = await repository.addItem(DTO, userDTO);

    if (resultFromDB.affectedRows === 1) {
        return {
            code : 200,
            message : "New item successfully inserted"
        }
    } else {
        return {
            code : 500,
            message : "Failed to insert new item"
        }
    }
    
}