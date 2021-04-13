"use strict";

const repository = require('../repositories/credentials');

exports.register = async function(DTO) {

    let emailOnly = DTO.email;

    let checkUserAlreadyRegistered = await repository.checkUserByEmail(emailOnly);
    if (checkUserAlreadyRegistered.length !== 0) {
        return {
            code : 400,
            message : "Already registered"
        }
    }

    let dataToRegister = {
        email : DTO.email,
        password : DTO.password,
        username : DTO.username
    };

    let registered = await repository.register(dataToRegister);
    if (registered.affectedRows !== 0) {
        return {
            code : 200,
            message : "Successfully registered"
        }
    }
}