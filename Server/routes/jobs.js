const express = require('express')
const pool = require('../configs/dbConfig')
const router = express.Router();

const {formatCustomerJSON, formatSiteJSON, formatJobJSON,
	formatJobFullJSON} = require("../configs/jsonConfig")


// Handle job GET route for all jobs
router.get('/', (req, res) => {
	const query = `SELECT
		j.job_id, j.name, j.description, j.start_time, j.end_time,
		c.customer_id, c.first_name, c.last_name, c.email, c.cell, c.home,
		s.site_id, s.address, s.volume, s.type
		FROM jobs AS j INNER JOIN customers AS c ON c.customer_id = j.customer_id
		INNER JOIN sites AS s ON s.site_id = j.site_id`

	pool.query(query, (err, results, fields) => {
		if (err) {
			const response = { data: null, message: err.message, }
			res.send(response);
			return;
		}

		let jobs = [];

		results.forEach(e => {
			jobs.push(formatJobFullJSON(e));
		});

		res.status(200).send({
			data: jobs,
			message: 'All jobs successfully retrieved.',
		});
	});
});

// Handle job GET route for specific job
router.get('/:id', (req, res) => {
	const id = req.params.id
	const query = `SELECT
		j.job_id, j.name, j.description, j.start_time, j.end_time,
		c.customer_id, c.first_name, c.last_name, c.email, c.cell, c.home,
		s.site_id, s.address, s.volume, s.type
		FROM jobs AS j INNER JOIN customers AS c ON c.customer_id = j.customer_id
		INNER JOIN sites AS s ON s.site_id = j.site_id
		WHERE job.job_id = '${id}'
		LIMIT 1`;

	//    const sql = `SELECT * FROM sites WHERE site_id='${site_id}' LIMIT 1`

	pool.query(query, (err, results, fields) => {
		if (err) {
			const response = { data: null, message: err.message, }
			res.send(response);
		}

		let response;
		if (results) {
			const data = formatJobFullJSON(results[0]);
			res.status(200).send({
				data: data,
				message: `Job ${data.job.job_id} successfully retrieved.`,
			})
		} else {
			res.status(400).send({data: null, message: "Job " + id + " does not exist"});
		}
	});
});

// Create a new job - POST /jobs/
router.post('/', (req, res) => {
	if (!req.is('application/json')) {
		res.status(400).send({ data: null, message: "Content-type must be application/json" });
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
				res.status(500).send({data: null, message: "Internal error in POST request while finding customer site id"});
				return;
			}

			if (!results || results.length === 0) {
				res.status(400).send({data: null, message: "Could not find site for customer"});
				return;
			}

			site_id = results[0];
			callback(customer_id, site_id, start_time, end_time, name, description);
		});
	}

	// Callback query, called once site_id is defined
	function callback(customer_id, site_id, start_time, end_time, name, description) {
		const query = `INSERT INTO jobs (customer_id, site_id, start_time, end_time, name, description) VALUES ` +
			`('${customer_id}', '${site_id}', '${start_time}', '${end_time}', '${name}', '${description}') `;

		pool.query(query, (err, results, fields) => {
			if (err) {
				const response = { data: null, message: err.message, }
				res.status(500).send(response);
				return;
			}

			const { insertId } = results;
			const job = { id: insertId, customer_id, site_id, start_time, end_time, name, description }
			const response = {
				data: job,
				message: `Job ${insertId} successfully added.`
			}
			res.status(201).send(response);
		});
	}

});

// Handle job PUT route - Update an existing job
router.put('/:id', (req, res) => {
	if (!req.is('application/json')) {
		const response = { data: null, message: "Content-type must be application/json" };
		res.status(400).send(response);
		return;
	}

	const { id } = req.params;
	const query = `SELECT * FROM jobs WHERE job_id=${id} LIMIT 1`;
	pool.query(query, (err, results, fields) => {
		if (err) {
			const response = { data: null, message: err.message, }
			res.status(500).send(response);
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
				const response = { data: null, message: err.message, };
				res.status(500).send(response);
				return;
			}

			const job = {
				id,
				customer_id,
				site_id,
				start_time,
				end_time,
				name,
				description
			};

			res.status(201).send({
				data: job,
				message: "Job " + name + " successfully updated.",
			});
		});
	});
});

// Handle job DELETE route - Delete an existing job
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	const query = `DELETE FROM jobs WHERE job_id=${id}`;
	pool.query(query, (err, results, fields) => {
		if (err) {
			const response = { data: null, message: err.message };
			res.status(500).send(response);
			return;
		}

		const response = {
			data: null,
			message: "Job with id: " + id + " successfully deleted.",
		}
		res.send(response);
	});
});

// Handle invalid /jobs/ route
router.all('/*', function(req, res) {
	res.status(400).send({
		data: null, message: 'Route not found'
	});
});

module.exports = router;
