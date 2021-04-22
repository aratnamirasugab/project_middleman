"use strict";

const repository = require('../repositories/circle')

exports.createCircle = async function (DTO, userDTO) {

    let alreadyHasCircle = await repository.alreadyHasCircle(userDTO)
    if (alreadyHasCircle.length !== 0) {
        return {
            code : 200,
            message : "Already on circle"
        }
    }
    
    let createCircleToDB = await repository.createCircle(DTO, userDTO)
    if (createCircleToDB.affectedRows === 0) {
        return {
            code : 500,
            message : "Failed to post create circle to db"
        }
    }

    return {
        code : 200,
        message : "Successfully created new circle"
    }
}

exports.editCircleInfo = async function (DTO, userDTO) {

    let editCircleInfoToDB = await repository.editCircleInfo(DTO, userDTO)
    if (editCircleInfoToDB.affectedRows === 0) {
        return {
            code : 500,
            message : "Failed to update circle info"
        }
    }

    return {
        code : 200,
        message : "Successfully edited circle info"
    }
}

exports.updateCircleAvatar = async function (DTO, userDTO) {

    let updateCircleAvatarToDB = await repository.updateCircleAvatar(DTO, userDTO)
    if (updateCircleAvatarToDB.affectedRows === 0) {
        return {
            code : 500,
            message : "Failed to update circle info"
        }
    }

    return {
        code : 200,
        message : "Successfully edited circle info"
    }
}

exports.inviteNewMember = async function (paramDTO, userDTO) {

    // search user with given username, if not push error
    // if found, check if user already on another circle, if yes push error
    // if no then push into invite table
    let searchUserWithGivenUsername = await repository.searchUserWithGivenUsername(paramDTO, userDTO)
    if (searchUserWithGivenUsername.length === 0) {
        return {
            code : 200,
            message : "User with username " + paramDTO.username + " is not found"
        }
    }

    let userAlreadyHasCircle = await repository.alreadyHasCircle(searchUserWithGivenUsername[0])
    if (userAlreadyHasCircle.length !== 0) {
        return {
            code : 200,
            message : `User ${paramDTO.username} already on another circle`
        }
    }
    
    let pushToCircleInviteTable = await repository.inviteMemberToCircle(searchUserWithGivenUsername[0].id, userDTO)
    if (pushToCircleInviteTable.affectedRows !== 1) {
        return {
            code : 500,
            messsage : `Failed to invite ${paramDTO.username} to circle`
        }
    }

    return {
        code : 200,
        message : "Successfully invited " + paramDTO.username
    }
}

exports.getCircleInvitation = async function (userDTO) {

    let findInvitationFromDB = await repository.getCircleInvitation(userDTO)
    let result = []
    findInvitationFromDB.forEach(item => {
        result.push({
            "circle_id" : item["id"],
            "circle_name" : item["name"],
            "circle_description" : item["description"],
            "circle_admin" : item["admin_username"],
            "founded_at" : item["created_at"]
        })
    });

    for (let res of result) {
        let total_member = await repository.getTotalMemberEachCircleInvite(res["circle_id"])
        res["total_member"] = total_member
    }

    if (result.length === 0) {
        return {
            code : 200,
            message : "There is no invitation to join circle yet..",
            invitation_list : []
        }
    } else {
        return {
            code : 200,
            message : "OK",
            invitation_list : result
        }
    }
}

exports.approveCircleInvitation = async function (paramDTO, userDTO) {

    let alreadyJoinedCircle = await repository.alreadyHasCircle(userDTO)
    if (alreadyJoinedCircle.length !== 0) {
        return {
            code : 400,
            message : "Can't accept new circle invitation because already on circle"
        }
    }

    let invitationExist = await repository.circleInvitationExist(paramDTO.circle_id, userDTO)
    if (invitationExist === undefined) {
        return {
            code : 404,
            message : "Invitation not found"
        }
    }

    let pushToCircleMember = await repository.acceptCircleInvitation(paramDTO.circle_id, userDTO)
    if (pushToCircleMember.changedRows !== 1) {
        return {
            code : 500,
            message : "Error when accepting circle invitation"
        }
    }

    return {
        code : 200,
        message : "Invitation accepted."
    }
}

exports.removeMemberAsAdmin = async function (paramDTO, userDTO) {

    let userAdmin = await repository.userAdmin(userDTO)
    if (!userAdmin.is_admin) {
        return {
            code : 403,
            message : "You're not admin"
        }
    }

    let checkMemberExist = await repository.searchUserWithGivenUsername(paramDTO)
    if (checkMemberExist.length === 0) {
        return {
            code : 404,
            message : "Member not found or perhaps not active anymore"
        }
    }

    let checkIfUserAlreadySentQuitRequest = await repository.findQuitCircleRequestByMemberId(checkMemberExist[0])
    if (!checkIfUserAlreadySentQuitRequest || checkIfUserAlreadySentQuitRequest.length === 0) {
        return {
            code : 404,
            message : "Member hasn't send quit request"
        }
    }
    
    let updateCircleMember = await repository.removeMemberFromCircle(checkMemberExist[0])
    if (updateCircleMember.changedRows !== 1) {
        return {
            code : 500,
            message : "Error when removing member from circle"
        }
    }

    return {
        code : 200,
        message : "Member successfully removed."
    }
    
}

exports.quitRequestFromCircle = async function (userDTO) {

    let findUser = await repository.findUserHasCircle(userDTO)
    if (typeof(findUser) === undefined || findUser.length === 0) {
        return {
            code : 404,
            message : "You're not a member from circle"
        }
    }

    let {is_admin} = await repository.userAdmin(userDTO)
    if (typeof(is_admin) === undefined || is_admin) {
        return {
            code : 400,
            message : "You're admin, can't quit circle"
        }
    }

    let alreadyMadeRequest = await repository.findQuitCircleRequestByMemberId(userDTO)
    if (alreadyMadeRequest.length !== 0) {
        return {
            code : 400,
            message : "Already made request, wait for admin to decide"
        }
    }

    let {affectedRows} = await repository.createQuitRequestFromCircle(findUser[0])
    if (typeof(affectedRows) == undefined || affectedRows == 0) {
        return {
            code : 500,
            message : "Failed to create quit request from circle"
        }
    }

    return {
        code : 200,
        message : "Request successfully made"
    }
    
}

exports.getQuitRequestListAsAdmin = async function (userDTO) {

    let {is_admin} = await repository.userAdmin(userDTO)
    if (!is_admin) {
        return {
            code : 400,
            message : "You're not admin"
        }
    }

    let quit_list = await repository.findQuitRequestPerCircle(userDTO)
    let result = []

    quit_list.forEach(item => {
        result.push({
            user_id : item["user_id"],
            username : item["username"],
            created_at : item["created_at"]
        })
    });

    return {
        code : 200,
        message : "OK",
        list_member : result
    }

}

exports.getMemberList = async function (userDTO) {
    
    let fetchMemberList = await repository.getMemberList(userDTO)
    
    return {
        code : 200,
        message : "OK",
        list_member : fetchMemberList
    }

}