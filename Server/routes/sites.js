const express = require('express')
const pool = require('../configs/dbConfig')

const {
    formatCustomerJSON, formatSiteJSON, formatJobJSON,
    formatJobFullJSON
} = require("../configs/jsonConfig")

// const app = express()
const router = express.Router();

router.get("/", (req, res) => {
    const sql = `SELECT *
                 FROM sites`;

    pool.query(sql, (err, results, fields) => {
        if (err) {
            res.status(500).send({
                data: null,
                message: "Error during GET request: " + err.message,
            });

            return;
        }

        const sites = [...results];
        res.status(200).send({
            data: sites,
            message: "Successfully retrieved all sites"
        });
    });
});

router.get("/:id", (req, res) => {
    const site_id = req.params.id;
    //                               WHERE job.job_id = '${id}'
    const sql = `SELECT * FROM sites WHERE site_id = '${site_id}' LIMIT 1`
    pool.query(sql, (err, results, fields) => {
       if (err) {
           res.status(500).send( {
               data: null,
               message: "Error during GET request: " + err.message
           });
           return;
       }

       let data = null;
       if (results && results.length > 0) {
           data = results[0];
       }

       res.status(200).send({
           data: data,
           message: "Successfully retrieved site " + site_id
       });
    });

});

module.exports = router;
