import {Server} from "../configs/server";

const express = require('express')
const pool = require('../configs/dbConfig')
const router = express.Router();

const {formatCustomerJSON, formatSiteJSON, formatJobJSON,
	formatJobFullJSON, formatReportsJSON} = require("../configs/jsonConfig")


// job GET route for querying all jobs
router.get('/', (req, res) => {
	const jobsQuery = `SELECT
			j.job_id, j.name, j.description, j.start_time, j.end_time,
			c.customer_id, c.first_name, c.last_name, c.email, c.cell, c.home,
			s.site_id, s.address, s.volume, s.type,
			r.report_id, r.status_id, r.user_id, r.text 
		
		FROM jobs AS j INNER JOIN customers AS c 
		ON c.customer_id = j.customer_id
		
		INNER JOIN sites AS s 
		ON s.site_id = j.site_id
		
		LEFT OUTER JOIN reports AS r ON r.job_id = j.job_id
		ORDER BY job_id
		`

	pool.query(jobsQuery, (err, results, fields) => {
		if (err) {
			Server.send500(res, err.message);
			return;
		}

		let jobs = parseJobs(results);
		Server.sendOK(res, jobs, "All jobs successfully retrieved.");
	});
});

// job GET route for querying a specific job
router.get('/:id', (req, res) => {
	const id = req.params.id

	const query = `SELECT
		j.job_id, j.name, j.description, j.start_time, j.end_time,
		c.customer_id, c.first_name, c.last_name, c.email, c.cell, c.home,
		s.site_id, s.address, s.volume, s.type,
		r.report_id, r.status_id, r.user_id, r.text
		FROM jobs AS j INNER JOIN customers AS c ON c.customer_id = j.customer_id
		INNER JOIN sites AS s ON s.site_id = j.site_id
		LEFT OUTER JOIN reports AS r ON r.job_id = j.job_id
		WHERE j.job_id = '${id}'`;

	pool.query(query, (err, results, fields) => {
		if (err) {
			Server.send500(err.message);
			return;
		}

		let response;
		if (results) {
			// Only one job is being queried; send it as an object instead of an array
			let jobObject = parseJobs(results)[0];
			Server.sendOK(res, jobObject, "Job " + jobObject.job.job_id + " retrieved.");
		} else {
			Server.send400(res, "Job " + id + " not found");
		}
	});
});

// job POST route for creating a new job
router.post('/', (req, res) => {
	if (!Server.isJSON(req)) {
		Server.send400(res, "Content-type must be application/json");
		return;
	}

	let { customer_id, site_id, start_time, end_time, name, description } = req.body;

	// If site id is not defined, query it
	if (site_id) {
		callback(customer_id, site_id, start_time, end_time, name, description);
	} else {
		const siteQuery = `SELECT site_id FROM sites WHERE customer_id = '${customer_id}'`;
		pool.query(siteQuery, (err, results, fields) => {
			if (err) {
				Server.send500(res, "Internal error in POST request while finding customer site id: " + err.message);
				return;
			}

			if (!results || results.length === 0) {
				Server.send400(res, "Site for customer " + customer_id + " not found");
				return;
			}

			site_id = results[0];
			callback(customer_id, site_id, start_time, end_time, name, description);
		});
	}

	// Callback query, called once site_id is defined
	const callback = (customer_id, site_id, start_time, end_time, name, description) => {
		const query = `INSERT INTO jobs (customer_id, site_id, start_time, end_time, name, description) VALUES ` +
			`('${customer_id}', '${site_id}', '${start_time}', '${end_time}', '${name}', '${description}') `;

		pool.query(query, (err, results, fields) => {
			if (err) {
				Server.send500(res, err.message);
				return;
			}

			const { insertId } = results;
			const job = { job_id: insertId, customer_id, site_id, start_time, end_time, name, description }
			Server.send(res, 201, job, "Job " + insertId + " created.");
		});
	}
});

// job PUT route for updating an existing job
router.put('/:id', (req, res) => {
	if (!Server.isJSON(req)) {
		Server.sendJSONError(res);
		return;
	}

	const { id } = req.params;
	const query = `SELECT * FROM jobs WHERE job_id=${id} LIMIT 1`;
	pool.query(query, (err, results, fields) => {
		if (err) {
			Server.send500(res, err.message);
			return;
		}

		const { job_id, customer_id, site_id, start_time, end_time, name, description } = { ...results[0], ...req.body }

		const query = `UPDATE jobs SET
			customer_id='${customer_id}', site_id='${site_id}', start_time='${start_time}',
			end_time='${end_time}', name='${name}', description='${description}'
		    WHERE job_id='${job_id}'`;

		console.log("Executing query (" + query + ")");
		console.log("...results[0] " + JSON.stringify(results[0]));
		console.log("req.body " + JSON.stringify(req.body, null, 2));
		console.log("spread: \ncustomer_id " + customer_id + " site_id " + site_id);
		console.log("params " + JSON.stringify(req.params));

		pool.query(query, (err, results, fields) => {
			if (err) {
				Server.send500(res, err.message);
				return;
			}

			const job = {
				job_id,
				customer_id,
				site_id,
				start_time,
				end_time,
				name,
				description
			};

			Server.send(res, 201, job, "Job " + job_id + " updated.");
		});
	});
});

// job DELETE route for deleting an existing job
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	const query = `DELETE FROM jobs WHERE job_id=${id}`;
	pool.query(query, (err, results, fields) => {
		if (err) {
			Server.send500(res, err.message);
			return;
		}

		Server.sendOK(res, null, "Job " + id + " deleted.");
	});
});

// invalid /jobs/ route
router.all('/*', function(req, res) {
	Server.send400(res, "Route not found");
});

function parseJobs(results) {
	/* Parse messy query results into a structured object.
	* This is used in job GET requests (/jobs/ and /jobs{id}
	*/


		/*
		Querying jobs is complicated because their information is spread amongst many tables:
		Jobs relate to 1 customer, 1 site, 0 or many reports.

		If a job has multiple reports, queries return multiple rows for the same job.
            Ex:
                job_id		report_id	report_text
                    1			1		Customer was not home; they will need to reschedule pool school
                    1			2		The pool pump was installed without issues

		This function parses these rows into a structured object. Example output below:
		[
			{
			  "job": {
				"job_id": 1,
				"site_id": 1,
				"customer_id": 1,
				"name": "Pool cleaning + deliver order",
				"description": "Clean the pool and deliver the chlorine that Joe ordered",
				"start_time": "2020-11-30T02:51:37.000Z",
				"end_time": "2020-11-30T04:51:37.000Z",
				"reports": [
				  {
					"report_id": 4,
					"user_id": 2,
					"job_id": 1,
					"status_id": 2,
					"text": "Customer requested a new jet faceplate be delivered"
				  },
				  {
					"report_id": 3,
					"user_id": 2,
					"job_id": 1,
					"status_id": 1,
					"text": "No problems with scheduled job"
				  }
				]
			  },
			  "customer": {
				"customer_id": 1,
				"site_id": 1,
				"first_name": "joe",
				"last_name": "blow",
				"email": "joe.blow@gmail.com",
				"cell": "555 432-1987",
				"home": "555 843-4812"
			  },
			  "site": {
				"site_id": 1,
				"customer_id": 1,
				"address": "123 Smiley St.",
				"volume": 50000,
				"type": "Inground pool"
			  }
			},

			{
			... (more jobs here)
			}
		  ]
        */
	let jobs = [];
	let prevIndex = -1;
	results.forEach((e, index) => {
		if (prevIndex > -1 && jobs[prevIndex].job.job_id === e.job_id) {
			jobs[prevIndex].job.reports.push(formatReportsJSON(e));
		} else {
			jobs.push(formatJobFullJSON(e));
			prevIndex++;
		}
	});

	return jobs;
}

module.exports = router;
