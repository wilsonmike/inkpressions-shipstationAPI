require('dotenv').config()
const express = require("express");
const ship = express.Router();
const key = process.env.API_KEY;
const secret = process.env.API_SECRET;
const fetch = require('node-fetch');
const encoded = Buffer.from(key + ":" + secret).toString('base64');
var shipments;

Promise.all([
	fetch('https://ssapi.shipstation.com/shipments?createDateStart=2021-01-01&storeId=78297&createDateEnd=2021-01-31&includeShipmentItems=true&pageSize=500&page=1', {
    method: 'GET',
    headers: {
        Authorization: 'Basic ' + encoded,
    },
}),
fetch('https://ssapi.shipstation.com/shipments?createDateStart=2021-01-01&storeId=78297&createDateEnd=2021-01-31&includeShipmentItems=true&pageSize=500&page=2', {
    method: 'GET',
    headers: {
        Authorization: 'Basic ' + encoded,
    },
}),
fetch('https://ssapi.shipstation.com/shipments?createDateStart=2021-01-01&storeId=78297&createDateEnd=2021-01-31&includeShipmentItems=true&pageSize=500&page=3', {
    method: 'GET',
    headers: {
        Authorization: 'Basic ' + encoded,
    },
}),
fetch('https://ssapi.shipstation.com/shipments?createDateStart=2021-01-01&storeId=78297&createDateEnd=2021-01-31&includeShipmentItems=true&pageSize=500&page=4', {
    method: 'GET',
    headers: {
        Authorization: 'Basic ' + encoded,
    },
}),
]).then(function (responses) {
	// Get a JSON object from each of the responses
	return Promise.all(responses.map(function (response) {
        
		return response.json();
	}));
}).then(function (data) {
	// Log the data to the console
    shipments = data;
	// You would do something with both sets of data here
	console.log(shipments);
}).catch(function (error) {
	// if there's an error, log it
	console.log(error);
});


ship.get('/shipments', function(req,res) {
    return res.json(shipments);
})



module.exports = ship; 