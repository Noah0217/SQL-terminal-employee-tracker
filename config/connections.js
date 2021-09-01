//dependencies
const mysql = require('mysql2');
require('dotenv').config();

//connection to server
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    password: process.env.DB_PASS,
    database: "employee-tracker"
});

module.export = connection;