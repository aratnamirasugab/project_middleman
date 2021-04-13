"use strict";

const repository = require('../repositories/credentials');
const response = require('../context/response');

exports.register = async function(DTO) {
    let checkUserAlreadyRegistered = await repository.checkUserByEmail(DTO);
    // if (!checkUserAlreadyRegistered) {
        console.log("masuk");
        return Error("User is already registered");
    // }
}