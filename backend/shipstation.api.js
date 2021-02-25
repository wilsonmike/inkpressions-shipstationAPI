require('dotenv').config()
const express = require("express");
const ship = express.Router();
const key = process.env.API_KEY;
const secret = process.env.API_SECRET;
const fetch = require('node-fetch');
const encoded = Buffer.from(key + ":" + secret).toString('base64');
var shipments;


// fetch('https://ssapi.shipstation.com/orders?createDateStart=2021-01-01&storeId=78297&createDateEnd=2021-01-31&orderstatus=shipped', {
//     method: 'GET',
//     headers: {
//         Authorization: 'Basic ' + encoded,
//     },
// }).then(res => res.json()).then(data => shipments = data).then(json => console.log(shipments));

async function apiCall() {
    const response = await fetch('https://ssapi.shipstation.com/shipments?createDateStart=2021-01-01&storeId=78297&createDateEnd=2021-01-31&includeShipmentItems=true&pageSize=500', {
    method: 'GET',
    headers: {
        Authorization: 'Basic ' + encoded,
    },
});
    const json = await response.json();
    console.log(json);
    shipments = json;
    return json;
}
apiCall();

// const request = require('request');
// const options = {
//     url: 'https://ssapi.shipstation.com/shipments?createDateStart=2021-01-01&storeId=78297&createDateEnd=2021-01-31&includeShipmentItems=true',
//     method: 'GET',
//     headers: {
//         Authorization: 'Basic ' + encoded,
//     }
// };
// request(options, function(err,res,body) {
//     let json = JSON.parse(body);
//     shipments = json; 
//     console.log(json);
// })


ship.get('/shipments', function(req,res) {
    return res.json(shipments);
})



module.exports = ship; 