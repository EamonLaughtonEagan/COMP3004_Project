
const express = require('express')
const pool = require('../configs/dbConfig')
const {Server} = require("../configs/server");

const router = express.Router();

const {jsonConfig} = require('../configs/jsonConfig')

router.post("/", function(req, res) {
    if (!Server.isJSON(req)) {
        Server.sendJSONError(res);
        return;
    }

    const {user_id , report_time, job_id, status_id, text} = req.body;

    const insertReport = `INSERT INTO reports (user_id, report_time, job_id, status_id, text)
        VALUES ('${user_id}', '${report_time}', '${job_id}', '${status_id}', '${text}')`;

    pool.query(insertReport, (err, results) => {
        if (err) {
            Server.send500(res, err.message);
            return;
        }

        const { insertId } = results;

        Server.sendOK(res, {
            results: results,
            insert_id: insertId,
        }, "Query successful.");
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    let delQuery = `DELETE FROM reports WHERE report_id='${id}'`

    pool.query(delQuery, (err, results) => {
        if (err) {
            Server.send500(res, err.message);
            return;
        }

        Server.sendOK(res, {
            results: results
        }, "Deletion successful.");
    })
})


module.exports = router;
