"use strict";

const repositoryOrder = require('../repositories/order');
const repositoryCircle = require('../repositories/circle');
const repositoryItem = require('../repositories/item');
const serviceShipping = require('../services/shipping')

exports.orderItem = async function(DTO, userDTO) {

    let hasCircle = await repositoryCircle.findUserHasCircle(userDTO);
    if (hasCircle.length === 0) {
        return {
            code : 400,
            message : "You're not belong to any group"
        }
    }

    if (userDTO.id === DTO.seller_id) {
        return {
            code : 403,
            message : "Error, can't trade with the same people"
        }
    }

    let total_weight = 0
    let total_price = 0
    for (let item of DTO.item_list) {
        let itemData = await repositoryItem.getItemInfo(item);
        if (itemData.length === 0) {
            return {
                code : 404,
                message : "Item not found"
            }
        }

        item["weight"] = itemData["weight"];
        item["price"] = itemData["price"];

        if (item["quantity"] > itemData["quantity"]) {
            return {
                code : 400,
                message : "Item stock is less than the amount user wanna buy"
            }
        }

        if (itemData["user_id"] !== DTO.seller_id) {
            return {
                code : 400,
                message : "Item is not belong to the seller"
            }
        }

        total_weight += item["weight"] * item["quantity"];
        total_price += item["price"] * item["quantity"];
    }

    let seller_shipping_code = await repositoryCircle.getShippingCodeMember(DTO.seller_id);
    let buyer_shipping_code = await repositoryCircle.getShippingCodeMember(userDTO.id);

    if (seller_shipping_code == null || buyer_shipping_code == null) {
        return {
            code : 404,
            message : "Seller or Buyer haven't fill their shipping code"
        }
    }
    
    let shippingDTO = {
        'origin' : seller_shipping_code.toString(),
        'destination' : buyer_shipping_code.toString(),
        'weight' : parseInt(total_weight),
        'courier' : DTO.courier.toString().toLowerCase()
    }

    let {circle_id} = await repositoryCircle.getCircleId(userDTO);
    let shipping_fee = await serviceShipping.shippingFee(shippingDTO);
    let filteredShippingFee = shipping_fee.message[0].costs[1].cost[0].value
    DTO["shipping_price"] = filteredShippingFee * total_weight;
    DTO["total_price"] = total_price + DTO["shipping_price"];
    DTO["circle_id"] = circle_id
    
    let inputToDB = await repositoryOrder.orderItem(DTO, userDTO);
    if (inputToDB.affectedRows === 0) {
        return {
            code : 500,
            message : "Error when executing order query"
        }
    }

    return {
        code : 200,
        message : "Order successfully placed"
    }

}

exports.getOrdersAsAdmin = async function(userDTO) {

    let hasCircle = await repositoryCircle.findUserHasCircle(userDTO);
    if (hasCircle.length === 0) {
        return {
            code : 400,
            message : "You're not belong to any group"
        }
    }

    let userAdmin = await repositoryCircle.userAdmin(userDTO)
    if (!userAdmin.is_admin) {
        return {
            code : 403,
            message : "You're not admin"
        }
    } 

    let {circle_id} = await repositoryCircle.getCircleId(userDTO);
    let list_order = await repositoryOrder.getOrdersAsAdmin(circle_id);
    
    for (let order of list_order) {
        let dataOrder = await repositoryOrder.getOrderDetail(order["id"]);
       
        let temp = []
        for (let item of dataOrder) {
            
            let tempItem = {}
            tempItem.item_id = item['item_id'];
            
            let itemNameAndPrice = await repositoryItem.getItemInfo(tempItem);

            temp.push({
                "item_id" : item["item_id"],
                "item_name" : itemNameAndPrice["name"],
                "price" : itemNameAndPrice["price"],
                "quantity" : item["quantity"]
            })
        }

        order["item_list"] = temp
    }
    
    return {
        code : 200,
        list_order
    }
    
}