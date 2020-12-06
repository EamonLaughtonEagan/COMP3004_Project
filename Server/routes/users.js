const express = require('express')
const pool = require('../configs/dbConfig')
const router = express.Router()


// GET request to /users/ - Queries all users
router.get('/', (req, res) => {
    const query = `SELECT * FROM users ` +
        `INNER JOIN permissions ON permissions.permission_id = users.permission_id `;

    pool.query(query, (err, results, fields) => {
        if (err) {
            const response = { data: null, message: err.message, }
            res.send(response)
            return
        }

        const users = [...results]
        const response = {
            data: users,
            message: 'All users successfully retrieved.',
        }
        res.send(response)
    })
})

// GET request to /users/{id}
router.get('/{id}', (req, res) => {
    const {user_id} = req.body;
    const query = `SELECT * FROM users WHERE user_id = '${user_id}'`;

    pool.query(query, (err, results, fields) => {
        if (err) {
            const response = { data: null, message: err.message}
            res.send(response);
            return
        }

        const user = [...results][0];
    })

})

// POST request to /users/ - Create new user
router.post('/', (req, res) => {
    if (!req.is('application/json')) {
        const response = {  data: null, message: "Content-type must be application/json" }
        res.status(400).send(response);
        return
    }

    const { user_id, permission_id, email, first_name, last_name } = req.body;

    const query = `INSERT INTO users (user_id, permission_id, email, first_name, last_name) VALUES ` +
        `('${user_id}', '${permission_id}', '${email}', '${first_name}', '${last_name}') `;

    pool.query(query, (err, results, fields) => {
        if (err) {
            const response = { data: "Internal server error", message: err.message, }
            res.send(response)
            return
        }

        const { insertId } = results
        const user = { user_id: insertId, permission_id, email, first_name, last_name }
        const response = {
            data: user,
            message: `User  ${insertId} successfully added.`
        }

        res.status(201).send(response)
    })
})

// PUT request to /users/{id} - Update user information
router.put('/:id', (req, res) => {
    if (!req.is('application/json')) {
        const response = {  data: null, message: "Content-type must be application/json" }
        res.status(400).send(response);
        return
    }

    const { id } = req.params
    const query = `SELECT * FROM users WHERE user_id=${id} LIMIT 1`
    pool.query(query, (err, results, fields) => {
        if (err) {
            const response = { data: "Error while querying database.", message: err.message, }
            res.send(response)
            return
        }

        const {user_id, permission_id, email, first_name, last_name} = { ...req.body, ...results[0] };
        const query = `UPDATE users SET ` +
            `user_id='${user_id}', permission_id='${permission_id}', email='${email}', ` +
            `first_name='${first_name}', last_name='${last_name}'`
            `WHERE user_id='${user_id}'`;


        pool.query(query, (err, results, fields) => {
            if (err) {
                const response = { data: "Error in user PUT request", message: err.message, }
                res.send(response)
                return;
            }

            const user = {
                user_id,
                permission_id,
                email,
                first_name,
                last_name
            }
            const response = {
                data: user,
                message: `User ${user_id} successfully updated.`,
            }
            res.send(response)
        })
    })
})

// DELETE request to /users/{id} - Delete user by id
router.delete('/:id', (req, res) => {
    const { id } = req.params
    const query = `DELETE FROM users WHERE user_id=${id}`
    pool.query(query, (err, results, fields) => {
        if (err) {
            const response = { data: null, message: err.message }
            res.send(response)
        }

        const response = {
            data: null,
            message: `User with id: ${id} successfully deleted.`,
        }
        res.send(response)
    })
})

// Handle in-valid route
router.all('/*', function(req, res) {
    const response = { data: null, message: 'Route not found' }
    res.status(400).send(response)
})

// wrap express app instance with serverless http function
module.exports = router;
