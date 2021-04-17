"use strict"

const repository = require('../repositories/item');

exports.addItem = async function (DTO, userDTO) {

    let resultFromDB = await repository.addItem(DTO, userDTO);

    console.log(resultFromDB);
    
}