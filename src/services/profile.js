"use strict";

const repository = require('../repositories/profile');
const baseURL = process.env.URL + '/api/profile/download/avatar' || 'http://localhost:3000/api/profile/download/avatar';

exports.addPhoneNumber = async function (DTO, userDTO) {

    let addPhoneNumberToDB = await repository.addPhoneNumber(DTO, userDTO);
    
    if (addPhoneNumberToDB.affectedRows === 2) {
        return {
            code : 200,
            message : "Successfully updated phone number"
        }
    } else if (addPhoneNumberToDB.affectedRows === 1) {
        return {
            code : 200,
            message : "Successfully added phone number"
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

    if (uploadAvatarToDB.affectedRows === 1) {
        return {
            code : 200,
            message : "Successfully added avatar"
        }
    } else if (uploadAvatarToDB.affectedRows === 2) {
        return {
            code : 201,
            message : "Successfully added avatar"
        }
    } else {
        return {
            code : 500,
            message : "There was a problem when executing profile picture route"
        }
    }
}

exports.getProfileInfo = async function (userDTO) {

    let resultFromDB = await repository.getProfileInfo(userDTO);

    let user_data = {
        "username" : resultFromDB.username,
        "avatar" : baseURL + "/" + resultFromDB.avatar,
        "registered_on" : resultFromDB.registered_on,
        "is_admin" : resultFromDB.is_admin,
        "email" : resultFromDB.email,
        "circle_info" : {
           "cicle_name": resultFromDB.circle_name,
           "total_member" : resultFromDB.total_member,
           "admin" : resultFromDB.is_admin
        }
    }

    return {
        code : 200,
        user_data : user_data
    }
}