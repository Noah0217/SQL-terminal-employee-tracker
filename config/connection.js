//dependencies
const mysql = require("mysql2");
require('dotenv').config();

//connection to server
const connection = mysql.createConnection({  ////https://www.tabnine.com/code/javascript/functions/mysql/createConnection
    host: "localhost",
    port: 3306,
    user: 'root',
    password: process.env.DB_PASS,
    database: "employee_tracker"
});

module.exports = connection;