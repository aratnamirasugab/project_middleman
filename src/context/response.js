'use strict';

exports.ok = function(values, res) {
    let data = {
        "code": 200,
        "status": "OK",
        "data": {
            "message" : values
        }
    };

    res.status(200).json(data);
    res.end();
};
            
exports.internal_server_error = function(values, res) {
    let data = {
        "code": 200,
        "status": "OK",
        "data": {
            "message" : values
        }
    };

    res.status(500).json(data)
    res.end();   
};