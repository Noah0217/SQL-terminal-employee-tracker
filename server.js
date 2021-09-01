//dependencies
const inquirer = require("inquire")
const mysql = require("mysql")
const CTable = require('console.table')
const chalk = require('chalk')  //https://www.npmjs.com/package/chalk
require("dotenv").config();  //https://www.npmjs.com/package/dotenv

//port to live server
const PORT = process.env.PORT || 3000;

//connection to MySQL        //https://www.tabnine.com/code/javascript/functions/mysql/createConnection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    password: process.env.DB_PASS,
    database: "employee-tracker"
});

