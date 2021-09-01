//dependencies
const inquirer = require("inquire")
const mysql = require("mysql")
const CTable = require('console.table')
const chalk = require('chalk')  //https://www.npmjs.com/package/chalk
require("dotenv").config();  //https://www.npmjs.com/package/dotenv

//port to live server
const PORT = process.env.PORT || 3000;

