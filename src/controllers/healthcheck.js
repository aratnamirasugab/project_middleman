"use strict";

const response = require('../context/response');

exports.healthcheck = function (req, res) {
    return response.ok("Middleman project, powered by Nodejs!", res);
};