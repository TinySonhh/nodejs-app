'use strict';
const mysql = require('mysql');

const pool = mysql.createPool({
	connectionLimit : 10, //important
	host: "your.db.host.io",
	user: "db_username",
	password: "db pass",
	database: "db name",
	debug    :  false
});

module.exports = pool