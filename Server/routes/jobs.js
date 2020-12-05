const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const pool = require('../configs/dbConfig')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Handle job GET route for all jobs
app.get('/jobs/', (req, res) => {
	const query = 'SELECT * FROM jobs ' +
		'INNER JOIN customers ON jobs.customer_id = customers.customer_id ' +
		'INNER JOIN sites ON jobs.site_id = sites.SITE_ID'
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
app.get('/jobs/:id', (req, res) => {
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
app.post('/jobs/', (req, res) => {
	const { customer_id, site_id, start_time, end_time, name, description } = req.body

	const query = `INSERT INTO jobs (customer_id, site_id, start_time, end_time, name, description) VALUES 
	('${customer_id}', '${site_id}', '${start_time}', '${end_time}', '${name}', '${description}')`
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
app.put('/jobs/:id', (req, res) => {
	const { id } = req.params
	const query = `SELECT * FROM jobs WHERE job_id=${id} LIMIT 1`
	pool.query(query, (err, results, fields) => {
		if (err) {
			const response = { data: null, message: err.message, }
			res.send(response)
			return
		}

		const { job_id, customer_id, site_id, start_time, end_time, name, description } = { ...results[0], ...req.body }

		const query = `UPDATE jobs SET ` +
			`customer_id='${customer_id}', site_id='${site_id}', start_time='${start_time}', ` +
			`end_time='${end_time}', name='${name}', description='${description}' ` +
		    `WHERE job_id='${job_id}'`

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
app.delete('/jobs/:id', (req, res) => {
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

// Handle in-valid route
app.all('*', function(req, res) {
	const response = { data: null, message: 'Route not found!' }
	res.status(400).send(response)
})

// wrap express app instance with serverless http function
module.exports.handler = serverless(app)
