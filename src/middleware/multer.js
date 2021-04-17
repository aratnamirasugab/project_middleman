"use strict";

const multer = require('multer');
const fs = require('fs-extra');

exports.upload = multer({
    storage : multer.diskStorage({
        destination : function (req, file, cb) {
            let destination = req.url.split('/');
            let path = './uploads/' + destination[2] + "/";
            // fs.mkdirSync(path);
            cb(null, path);
        },
        filename : function (req, file, cb) {
            cb(null, (req.user.id + "-" + file.fieldname + "-" + file.originalname).toLowerCase());
        }
    })    
});