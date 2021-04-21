"use strict";

const db = require('../config/db_conn');
const {generateCurrentTime} = require('../helpers/time');

exports.alreadyHasCircle = async function (userDTO) {
    
    let query_circle_member = `
        SELECT id
        FROM
            circle_member
        WHERE
            user_id = ?
            AND
            deleted_at IS NULL
        LIMIT 1
    `
    
    let values_circle_member = [
        userDTO.id
    ]

    return new Promise(function (resolve, reject) {
        db.query(query_circle_member, values_circle_member, function (err, rows, fields) {
            if (err) reject(err)
            resolve(rows)
        })
    })
}   

exports.createCircle = async function (DTO, userDTO) {

    let query_create_circle = `
        INSERT INTO circle
        (name, description, circle_avatar, admin_id, created_at)
        VALUES
        (?,?,?,?,?)
    `

    let values_create_circle = [
        DTO.name, DTO.description, DTO.filename, userDTO.id, generateCurrentTime()
    ]

    return new Promise(function(resolve, reject) {
        db.beginTransaction(function(err) {

            if (err) reject(err)

            db.query(query_create_circle, values_create_circle, function (error, result, fields) {

                if (error) {
                    db.rollback(function() {
                        reject(error)
                    })
                }

                let query_push_to_table_circle_member = `
                    INSERT INTO circle_member
                        (circle_id, user_id, created_at)
                    VALUES
                        (?,?,?)
                `
                let values_push_to_table_circle_member = [
                    result.insertId, userDTO.id, generateCurrentTime()
                ]

                db.query(query_push_to_table_circle_member, values_push_to_table_circle_member, function (error, result, fields) {
                    
                    if (error) {
                        db.rollback(function() {
                            reject(error)
                        })
                    }

                    let query_update_user_is_admin = `
                        UPDATE user
                        SET 
                            is_admin = true,
                            updated_at = ?
                        WHERE 
                            id = ?
                    `
                    
                    let values_update_user_is_admin = [
                        generateCurrentTime(), userDTO.id
                    ]

                    db.query(query_update_user_is_admin, values_update_user_is_admin, function (error, result, fields) {

                        if (error) {
                            db.rollback(function() {
                                reject(error)
                            })
                        }

                        db.commit(function (error) {
                            if (error) {
                                return db.rollback(function() {
                                    reject(error)
                                })
                            }
                            resolve(result)
                        })
                    })
                })
            })
        })
    })
}

exports.editCircleInfo = async function (DTO, userDTO) {

    let query_circle = `
        UPDATE circle
        SET
            description = ?,
            updated_at = ?
        WHERE 
            admin_id = ?
    `
    
    let values_circle = [
        DTO.description, generateCurrentTime(), userDTO.id
    ]

    return new Promise(function (resolve, reject) {
        db.query(query_circle, values_circle, function (err, rows, fields) {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

exports.updateCircleAvatar = async function (DTO, userDTO) {

    let query_circle = `
        UPDATE circle
        SET
            circle_avatar = ?,
            updated_at = ?
        WHERE 
            admin_id = ?
    `
    
    let values_circle = [
        DTO.filename, generateCurrentTime(), userDTO.id
    ]

    return new Promise(function (resolve, reject) {
        db.query(query_circle, values_circle, function (err, rows, fields) {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

exports.searchUserWithGivenUsername = async function (paramDTO) {
    
    let query_user = `
        SELECT id
        FROM
            user
        WHERE
            username = ?
            AND
            deleted_at IS NULL
        LIMIT 1
    `
    
    let values_user = [
        paramDTO.username
    ]

    return new Promise(function (resolve, reject) {
        db.query(query_user, values_user, function (err, rows, fields) {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

exports.inviteMemberToCircle = async function (member_id, userDTO) {
    
    let query_circle = `
        SELECT id
        FROM
            circle
        WHERE
            admin_id = ?
            AND
            deleted_at IS NULL
        LIMIT 1
    `

    let values_circle = [
        userDTO.id
    ]

    return new Promise(function (resolve, reject) {
        db.beginTransaction(function(err) {
            if (err) reject(err)

            db.query(query_circle, values_circle, function (err, result, fields) {
    
                if (err) {
                    db.rollback(function() {
                        reject(err)
                    })
                }

                let query_invite_member = `
                    INSERT INTO circle_invitation
                    (circle_id, admin_id, member_id, created_at)
                    VALUES(?,?,?,?)
                `

                let values_invite_member = [
                    result[0].id, userDTO.id, member_id, generateCurrentTime()   
                ]
                
                db.query(query_invite_member, values_invite_member, function (err, result, fields) {
                    
                    if (err) {
                        db.rollback(function() {
                            reject(err)
                        })
                    }

                    db.commit(function (error) {
                        if (error) {
                            return db.rollback(function() {
                                reject(error)
                            })
                        }
                        resolve(result)
                    })
                })
            })
        })
    })
}

exports.getCircleInvitation = async function (userDTO) {

    let query = `
        SELECT 
            c.id, c.name, c.description, c.admin_id, c.created_at,
            ci.circle_id,
            (SELECT username FROM user WHERE id = c.admin_id) AS admin_username
        FROM
            circle c
            INNER JOIN circle_invitation ci ON ci.circle_id = c.id
        WHERE
            ci.member_id = ?
            AND
            ci.deleted_at IS NULL;
    `

    let values = [
        userDTO.id
    ]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function (error, result, fields) {
            if (error) reject(error)
            resolve(result)
        })
    })
}

exports.getTotalMemberEachCircleInvite = async function (circle_id) {
    
    let query = `
        SELECT COUNT(*) AS total_member 
        FROM 
            circle_member 
        WHERE 
            circle_id = ?
    `

    let values = [circle_id]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function (error, result, fields) {
            if (error) reject(error)
            resolve(result[0].total_member)
        })
    })
}

exports.circleInvitationExist = async function (circle_id, userDTO) {

    let query = `
        SELECT * 
        FROM circle_invitation 
        WHERE 
            circle_id = ? 
            AND 
            member_id = ?
            AND
            deleted_at IS NULL 
            AND 
            accepted_at IS NULL
        LIMIT 1
    `

    let values = [circle_id, 23]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function (error, result, fields) {
            if (error) reject(error)
            resolve(result[0])
        })
    })
}

exports.acceptCircleInvitation = async function (circle_id, userDTO) {

    let query_circle_member = `
        INSERT INTO
            circle_member (circle_id, user_id, created_at)
        VALUES (?,?,?)
    `

    let values_circle_member = [
        circle_id, 23, generateCurrentTime()
    ]

    return new Promise(function(resolve, reject) {
        db.beginTransaction(function(error) {

            if (error) reject(error)

            db.query(query_circle_member, values_circle_member, function (error, result, fields) {

                if (error) {
                    db.rollback(function() {
                        reject(error)
                    })
                }

                let query_update_circle_invitation = `
                    UPDATE circle_invitation
                    SET
                        accepted_at = ?,
                        deleted_at = ?
                    WHERE
                        circle_id = ?
                        AND
                        member_id = ?
                `

                let values_update_circle_invitation = [
                    generateCurrentTime(), generateCurrentTime(), circle_id, 23
                ]

                db.query(query_update_circle_invitation, values_update_circle_invitation, function (error, result, fields) {
                    
                    if (error) {
                        db.rollback(function() {
                            reject(error)
                        })
                    }

                    db.commit(function (error) {
                        if (error) {
                            return db.rollback(function() {
                                reject(error)
                            })
                        }
                        resolve(result)
                    })
                })
            })
        })
    })
}