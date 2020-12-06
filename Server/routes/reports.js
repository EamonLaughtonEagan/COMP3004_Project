const express = require('express')
const pool = require('../configs/dbConfig')

const {
    formatCustomerJSON, formatSiteJSON, formatJobJSON,
    formatJobFullJSON
} = require("../configs/jsonConfig")

// const app = express()
const router = express.Router();


router.get("/", (req, res) => {


});

module.exports = router;
