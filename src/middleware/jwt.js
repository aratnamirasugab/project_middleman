"use strict";

const jwt = require('jsonwebtoken');

exports.generateAccessToken = async function (DTO) {
    return jwt.sign({
        id : DTO.id,
        email : DTO.email,
        username : DTO.username
    }, "MasukPakEko", {
        expiresIn: '30d'
    });
}