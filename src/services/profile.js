"use strict";

const repository = require('../repositories/profile');

exports.addPhoneNumber = async function (DTO, userDTO) {

    let addPhoneNumberToDB = await repository.addPhoneNumber(DTO, userDTO);
    if (addPhoneNumberToDB.affectedRows === 0) {
        return {
            code : 500,
            message : "There was a problem when adding phone number"
        }
    }

    return {
        code : 200,
        message : "Successfully added phone number"
    }
}

exports.addAddress = async function (DTO, userDTO) {

    let addAddressToDB = await repository.addAdress(DTO, userDTO);

    console.log(addAddressToDB);

    return {
        code : 200,
        message : "Successfully added address"
    }
}