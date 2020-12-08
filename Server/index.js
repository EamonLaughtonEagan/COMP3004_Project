const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')

const jobsRoute = require("./routes/jobs")
const usersRoute = require("./routes/users")
const sitesRoute = require("./routes/sites")
const customersRoute = require("./routes/customers")
const reportsRoute = require("./routes/reports")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Requests made to https://(endpoint)/dev/jobs are handled in ./routes/jobs.js
app.use('/jobs', jobsRoute);

// Requests made to https://(endpoint)/dev/reports are handled in ./routes/reports.js
app.use('/users', usersRoute);

// Requests made to https://(endpoint)/dev/sites are handled in ./routes/sites.js
app.use('/sites', sitesRoute);

// Requests made to https://(endpoint)/dev/customers are handled in ./routes/customers.js
app.use("/customers", customersRoute);

// Requests made to https://(endpoint)/dev/reports are handled in ./routes/reports.js
app.use("/reports", reportsRoute);


// HEAD requests to root /dev/ folder by convention should send back information about using the API
app.head('/', (req, res)=> {
    const response = {
        data: null,
        message: "Header information will be included here. Try /users/ or /jobs/"
    }

    res.send(response);
});

// Wrap express app in serverless http function
module.exports.handler = serverless(app)
