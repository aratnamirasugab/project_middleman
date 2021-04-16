"use strict";

const multer = require('multer');
const { generateCurrentTime } = require('../helpers/time');

const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename : function (req, file, cb) {
        cb(null, generateCurrentTime().toISOString() + file.originalname); 
    }
})

exports.upload = multer({storage : storage});



