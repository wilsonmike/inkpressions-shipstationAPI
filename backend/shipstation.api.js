const express = require("express");
const ship = express.Router();
const pool = require("./connection");
var shipments;

//api routes including pg data


ship.get('/shipments', function(req,res) {
    return res.json(shipments);
})

ship.get('/lineitems', (req,res) => {
    let query = `select * from fbtable`;
    pool.query(query).then((response) => {
        res.json(response.rows);
        // console.log(response.rows);
    })
})

module.exports = ship; 