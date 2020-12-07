const {Server} = require("../configs/server")

const express = require('express')
const pool = require('../configs/dbConfig')
const router = express.Router();

const formatCustomerJSON = (e) => {
    let customer = {
        customer_id: e.customer_id,
        first_name: e.first_name,
        last_name: e.last_name,
        email: e.email,
        cell: e.cell,
        home: e.home,

        sites: [],
    }

    if (e.site_id) {
        customer.sites.push(formatSiteJSON(e));
    }

    return customer;
}

const formatSiteJSON = (e) => {
    return {
        site_id: e.site_id,
        address: e.address,
        volume: e.volume,
        type: e.type,
    }
}

function parseCustomers(results) {
    let customers = [];
    let prevIndex = -1;

    results.forEach((e, index) => {
        if (prevIndex > -1 && customers[prevIndex].customer_id === e.customer_id) {
            customers[prevIndex].sites.push(formatSiteJSON(e));
        } else {
            customers.push(formatCustomerJSON(e));
            prevIndex++;
        }
    })

    return customers;
}

// GET route for querying all customers
router.get('/', (req, res) => {
    const customersQuery = `SELECT 
            c.customer_id, c.first_name, c.last_name, c.email, c.cell, c.home,
            s.site_id, s.address, s.volume, s.type
        
        FROM customers AS c LEFT OUTER JOIN sites AS s 
        ON c.customer_id = s.customer_id
        
        ORDER BY c.customer_id`;

    pool.query(customersQuery, (err, results, fields) => {
        if (err) {
            const response = { data: null, message: err.message, }
            res.status(500).send(response);
            return;
        }

        let customers = parseCustomers(results);

        Server.sendOK(res, customers, "All jobs successfully retrieved.");
    });
});

router.post('/', (req, res) => {
    if (!req.is("application/json")) {
        res.status(400).send({})
    }
})

module.exports = router;
