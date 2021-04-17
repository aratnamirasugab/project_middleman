"use strict";

const multer = require('multer');

const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename : function (req, file, cb) {
        cb(null, (req.user.id + "-" + file.fieldname + "-" + file.originalname).toLowerCase()); 
    }
})


exports.upload = multer({
    storage : storage
});



