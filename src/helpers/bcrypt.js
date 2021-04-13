const bcyrpt = require('bcrypt');
const { func } = require('joi');
const saltRounds = process.env.SALT_ROUNDS || 8;

exports.hashPassword = async function (password) {
    return new Promise(function(resolve, reject){
        bcyrpt.hash(password, saltRounds, function(err, hash) {
            if (err) reject(err);
            resolve(hash);
        })       
    })
}

exports.comparePassword = async function (password, passFromDB) {
    return new Promise(function(resolve, reject) {
        bcyrpt.compare(password, passFromDB, function(err, result){
            console.log(err);
            console.log(result);
            if (err) reject(err);
            resolve(result);
        })
    })
}