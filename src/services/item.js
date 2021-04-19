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

exports.getAllItem = async function (userDTO) {

    let resultFromDB = await repository.getAllItem(userDTO)
    let list_item = []
    resultFromDB.forEach(item => {
        list_item.push({
            "name" : item["name"],
            "stock" : item["quantity"],
            "price" : item["price"],
            "added_at" : item["created_at"]
        })
    });

    return {
        code : 200,
        message : "Successfully pull item list",
        list_item : list_item
    }
}