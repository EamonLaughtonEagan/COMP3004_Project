const mysql = require('mysql')

/*
 * For security purposes, these settings are stored as environment variables
 * within the AWS Lambda they are hosted on.
 */
const pool = mysql.createPool({
	host:		process.env.RDS_HOSTNAME,
	user:		process.env.RDS_USERNAME,
	password:	process.env.RDS_PASSWORD,
	port:		process.env.RDS_PORT,
	database:	process.env.RDS_DATABASE
});

module.exports = pool;
