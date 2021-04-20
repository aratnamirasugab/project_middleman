"use strict";

const repository = require('../repositories/circle')

exports.createCircle = async function (DTO, userDTO) {

    let alreadyHasCircle = await repository.alreadyHasCircle(userDTO)
    if (alreadyHasCircle.length !== 0) {
        return {
            code : 200,
            message : "Already on circle"
        }
    }
    
    let createCircleToDB = await repository.createCircle(DTO, userDTO)
    if (createCircleToDB.affectedRows === 0) {
        return {
            code : 500,
            message : "Failed to post create circle to db"
        }
    }

    return {
        code : 200,
        message : "Successfully created new circle"
    }
}