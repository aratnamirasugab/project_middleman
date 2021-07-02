"use strict";

const repository = require('../repositories/shipping');
const axios = require('axios');

let URL_RAJA_ONGKIR="https://api.rajaongkir.com/starter"
let API_KEY_RAJA_ONGKIR="76842c7d337d8b86cb3fdd8eec8e7426"

let requestInstance = axios.create({
    baseURL : URL_RAJA_ONGKIR,
    headers: {'key' : API_KEY_RAJA_ONGKIR}
});

exports.getShippingLocation = async function () {
    
    let dataFromDB = await repository.getShippingLocation();
    if (dataFromDB.length === 0) {
        let data = await requestInstance.get('/city');
        let filteredData = data.data.rajaongkir.results;
        await repository.insertLocationsToDB(filteredData);
    }

    return {
        code : 200,
        message : "Successfully pull shipping location data"
    }

}

exports.shippingFee = async function(DTO) {

    // available courier : jne, pos, tiki
    let cost = await requestInstance.post('/cost', {
        'origin' : DTO.origin.toString(),
        'destination' : DTO.destination.toString(),
        'weight' : parseInt(DTO.weight),
        'courier' : DTO.courier.toString().toLowerCase()
    });
    let costFiltered = cost.data.rajaongkir.results;
    return {
        code : 200,
        message : costFiltered
    }
}