"use strict";

const repository = require('../repositories/circle')

exports.createCircle = async function (DTO, userDTO) {

    // check di table circle member
    let alreadyHasCircle = await repository.alreadyHasCircle(userDTO)
    if (alreadyHasCircle[0].id) {
        return {
            code : 200,
            message : "Already on circle"
        }
    }
    
    // post iamge dan create circle dengan ID user dan update user isadmin true

    
    
}