const express = require('express')
const pool = require('../configs/dbConfig')

// const app = express()
const router = express.Router();

// Handle job GET route for all jobs
router.get('/', (req, res) => {
	const query = `SELECT * FROM jobs ` +
		`INNER JOIN customers ON jobs.customer_id = customers.customer_id ` +
		`INNER JOIN sites ON jobs.site_id = sites.SITE_ID`

	pool.query(query, (err, results, fields) => {
		if (err) {
			const response = { data: null, message: err.message, }
			res.send(response)
			return
		}

		const jobs = [...results]
		const response = {
			data: jobs,
			message: 'All jobs successfully retrieved.',
		}
		res.send(response)
	})
})

// Handle job GET route for specific job
router.get('/:id', (req, res) => {
	if (!req.is('application/json')) {
		const response = { data: null, message: "Content-type must be application/json" }
		res.status(400).send(response);
		return
	}

	const id = req.params.id
	const query = `SELECT * FROM jobs WHERE job_id=${id}`
	pool.query(query, (err, results, fields) => {
		if (err) {
			const response = { data: null, message: err.message, }
			res.send(response)
		}

		let response;
		if (results) {
			const job = results[0]
			response = {
				data: job,
				message: `Job ${job.job_id} successfully retrieved.`,
			}
		} else {
			response = {
				data: "None",
				message: `Job ${id} does not exist`
			}
		}


		res.status(200).send(response)
	})
})

// Handle job POST route
router.post('/', (req, res) => {
	if (!req.is('application/json')) {
		const response = { data: null, message: "Content-type must be application/json" }
		res.status(400).send(response);
		return
	}

	const { customer_id, site_id, start_time, end_time, name, description } = req.body

	const query = `INSERT INTO jobs (customer_id, site_id, start_time, end_time, name, description) VALUES ` +
	`('${customer_id}', '${site_id}', '${start_time}', '${end_time}', '${name}', '${description}') `;

	pool.query(query, (err, results, fields) => {
		if (err) {
			const response = { data: null, message: err.message, }
			res.send(response)
			return
		}

		const { insertId } = results
		const job = { id: insertId, customer_id, site_id, start_time, end_time, name, description }
		const response = {
			data: job,
			message: `Job ${insertId} successfully added.`
		}
		res.status(201).send(response)
	})
})

// Handle job PUT route
router.put('/:id', (req, res) => {
	if (!req.is('application/json')) {
		const response = { data: null, message: "Content-type must be application/json" }
		res.status(400).send(response);
		return
	}

	const { id } = req.params
	const query = `SELECT * FROM jobs WHERE job_id=${id} LIMIT 1`
	pool.query(query, (err, results, fields) => {
		if (err) {
			const response = { data: null, message: err.message, }
			res.send(response);
			return;
		}

		const { job_id, customer_id, site_id, start_time, end_time, name, description } = { ...results[0], ...req.body }

		const query = `UPDATE jobs SET ` +
			`customer_id='${customer_id}', site_id='${site_id}', start_time='${start_time}', ` +
			`end_time='${end_time}', name='${name}', description='${description}' ` +
		    `WHERE job_id='${job_id}'`;

		console.log("Executing query (" + query + ")");
		console.log("...results[0] " + JSON.stringify(results[0]));
		console.log("req.body " + JSON.stringify(req.body, null, 2));
		console.log("spread: \ncustomer_id " + customer_id + " site_id " + site_id);
		console.log("params " + JSON.stringify(req.params));

		pool.query(query, (err, results, fields) => {
			if (err) {
				const response = { data: null, message: err.message, }
				res.send(response)
			}

			const job = {
				id,
				customer_id,
				site_id,
				start_time,
				end_time,
				name,
				description
			}
			const response = {
				data: job,
				message: `Job ${name} successfully updated.`,
			}
			res.send(response)
		})
	})
})

// Handler job DELETE route
router.delete('/:id', (req, res) => {
	if (!req.is('application/json')) {
		const response = { data: null, message: "Content-type must be application/json" }
		res.status(400).send(response);
		return
	}

	const { id } = req.params
	const query = `DELETE FROM jobs WHERE job_id=${id}`
	pool.query(query, (err, results, fields) => {
		if (err) {
			const response = { data: null, message: err.message }
			res.send(response)
		}

		const response = {
			data: null,
			message: `Job with id: ${id} successfully deleted.`,
		}
		res.send(response)
	})
})

// Handle invalid /jobs/ route
router.all('/*', function(req, res) {
	const response = { data: null, message: 'Route not found' }
	res.status(400).send(response)
})

module.exports = router;
