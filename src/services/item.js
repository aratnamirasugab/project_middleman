"use strict"

const repository = require('../repositories/item');
const envs = require('../../config');
const itemPictureRoute = envs.BASE_URL + '/api/item/download/picture';

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
            "id" : item["id"],
            "name" : item["name"],
            "stock" : item["quantity"],
            "price" : item["price"],
            "added_at" : item["created_at"]
        })
    });

    for (let item of list_item) {
        let address = await repository.getItemPictureAddress(item["id"]);
        item.item_picture = itemPictureRoute + "/" + address
    }

    return {
        code : 200,
        message : "Successfully pull item list",
        list_item : list_item
    }
}

exports.deleteItem = async function (paramDTO) {

    let resultFromDB = await repository.deleteItem(paramDTO)

    if (resultFromDB.affectedRows === 1) {
        return {
            code : 200,
            message : "Successfully deleted the item"
        }
    } else {
        return {
            code : 500,
            message : "Failed to delete the item"
        }
    }
    
}

exports.updateItem = async function (DTO) {

    let resultFromDB = await repository.updateItem(DTO);

    if (resultFromDB.affectedRows === 1) {
        return {
            code : 201,
            message : "New item successfully inserted"
        }
    } else if (resultFromDB.affectedRows === 2) {
        return {
            code : 200,
            message : "New item successfully updated"
        }
    } else {
        return {
            code : 500,
            message : "Failed to query on updateItem"
        }
    }
}