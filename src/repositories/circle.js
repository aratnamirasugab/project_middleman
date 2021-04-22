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

    let values = [circle_id, userDTO.id]

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
        circle_id, userDTO.id, generateCurrentTime()
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
                    generateCurrentTime(), generateCurrentTime(), circle_id, userDTO.id
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

exports.userAdmin = async function (userDTO) {

    let query = `
        SELECT is_admin 
        FROM
            user
        WHERE
            id = ?
            AND
            deleted_at IS NULL
        LIMIT 1
    `

    let values = [userDTO.id]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function (error, result, fields) {
            if (error) reject(error)
            resolve(result[0])
        })
    })
}

exports.removeMemberFromCircle = async function (DTO) {
    
    let query_update_circle_member = `
        UPDATE circle_member
        SET
            deleted_at = ?
        WHERE
            user_id = ?
            AND
            deleted_at IS NULL
    `

    let values_update_circle_member = [
        generateCurrentTime(), DTO.id
    ]

    return new Promise(function(resolve, reject) {

        db.beginTransaction(function (error) {
            
            if (error) reject(error)

            db.query(query_update_circle_member, values_update_circle_member, function (error, result, fields) {

                if (error) {
                    db.rollback(function () {
                        reject(error)
                    })
                }

                let query_update_circle_quit_request = `
                    UPDATE circle_quit_request
                    SET
                        updated_at = ?,
                        deleted_at = ?,
                        approved_by_admin = ?
                    WHERE
                        user_id = ?
                `

                let values_update_circle_quit_request = [
                    generateCurrentTime(), generateCurrentTime(), true, DTO.id
                ]

                db.query(query_update_circle_quit_request, values_update_circle_quit_request, function (error, result, fields) {
                    
                    if (error) {
                        db.rollback(function () {
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

exports.findUserHasCircle = async function (userDTO) {

    let query = `
        SELECT *
        FROM
            circle_member
        WHERE
            user_id = ?
            AND
            deleted_at IS NULL
        LIMIT 1
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

exports.createQuitRequestFromCircle = async function (DTO) {

    let query = `
        INSERT INTO
            circle_quit_request
        (circle_id, user_id, created_at)
        VALUES
        (?,?,?)
    `

    let values = [
        DTO.circle_id, DTO.user_id, generateCurrentTime()
    ]

    return new Promise(function(resolve, reject) {
        db.beginTransaction(function(error) {
            if (error) reject(error)

            db.query(query, values, function (error, result, fields) {
                if (error) {
                    db.rollback(function () {
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
}

exports.findQuitCircleRequestByMemberId = async function (userDTO) {

    let query = `
        SELECT *
        FROM
            circle_quit_request
        WHERE
            user_id = ?
            AND
            approved_by_admin IS NULL
            AND
            deleted_at IS NULL
        LIMIT 1
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

exports.findQuitRequestPerCircle = async function (userDTO) {

    let query = `
        SELECT 
            user_id, u.username, cqr.created_at
        FROM
            circle_quit_request cqr
            INNER JOIN circle c ON c.id = cqr.circle_id
            INNER JOIN user u ON u.id = cqr.user_id
        WHERE
            c.admin_id = ?
        ORDER BY(created_at) DESC;
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

exports.getMemberList = async function (userDTO) {

    let query_circle_member_to_find_circle_id = `
        SELECT
            circle_id

        FROM
            circle_member

        WHERE
            user_id = ?
            AND
            deleted_at IS NULL

        LIMIT 1
    `

    let values_circle_member_to_find_circle_id = [
        userDTO.id
    ]
    
    return new Promise(function(resolve, reject) {
        db.query(query_circle_member_to_find_circle_id, values_circle_member_to_find_circle_id, function (error, result, fields) {

            if (error) reject(error)

            let query_to_find_members_username = `
                SELECT 
                    u.id, u.username, ud.avatar, cm.created_at as joined_at

                FROM
                    user u
                    INNER JOIN circle_member cm ON cm.user_id = u.id
                    INNER JOIN user_detail ud ON u.id = ud.user_id

                WHERE
                    cm.circle_id = ?
                    AND
                    cm.deleted_at IS NULL;
            `

            let values_to_find_members_username = [
                result[0].circle_id
            ]

            db.query(query_to_find_members_username, values_to_find_members_username, function (error, result, fields) {

                if (error) reject(error)

                resolve(result)  
            })      
        })
    })
}

exports.pushBonusScheme = async function (userDTO, DTO) {
    
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

    return new Promise(function(resolve, reject) {
        db.query(query_circle, values_circle, function (error, result, fields) {

            if (error) reject(error)

            let query_circle_bonus = `
                INSERT INTO circle_bonus
                    (circle_id, to_admin, to_member, created_at)
                VALUES
                    (?,?,?,?)
                ON DUPLICATE KEY UPDATE
                    to_admin = ?,
                    to_member = ?,
                    updated_at = ?
            `
            
            let values_circle_bonus = [
                result[0].id, DTO.to_admin, DTO.to_member, generateCurrentTime(),
                DTO.to_admin, DTO.to_member, generateCurrentTime()
            ]

            db.query(query_circle_bonus, values_circle_bonus, function (error, result, fields) {

                if (error) {
                    db.rollback(function () {
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
}
