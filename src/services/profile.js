"use strict";

const repository = require('../repositories/profile');

exports.addPhoneNumber = async function (DTO, userDTO) {

    let addPhoneNumberToDB = await repository.addPhoneNumber(DTO, userDTO);
    
    if (addPhoneNumberToDB.affectedRows === 2) {
        return {
            code : 200,
            message : "Successfully updated address"
        }
    } else if (addPhoneNumberToDB.affectedRows === 1) {
        return {
            code : 200,
            message : "Successfully added address"
        }
    } else {
        return {
            code : 500,
            message : "There was a problem when executing phone number route"
        }
    }
}

exports.addAddress = async function (DTO, userDTO) {

    let addressToDB = await repository.addAdress(DTO, userDTO);

    if (addressToDB.affectedRows === 2) {
        return {
            code : 200,
            message : "Successfully updated address"
        }
    } else if (addressToDB.affectedRows === 1) {
        return {
            code : 200,
            message : "Successfully added address"
        }
    } else {
        return {
            code : 500,
            message : "There was a problem when executing address route"
        }
    }
}

exports.addProfilePicture = async function (DTO, userDTO) {

    let uploadAvatarToDB = await repository.addProfilePicture(DTO, userDTO);

    if (uploadAvatarToDB.affectedRows === 2) {
        return {
            code : 200,
            message : "Successfully updated avatar"
        }
    } else if (uploadAvatarToDB.affectedRows === 1) {
        return {
            code : 200,
            message : "Successfully added avatar"
        }
    } else {
        return {
            code : 500,
            message : "There was a problem when executing profile picture route"
        }
    }
}