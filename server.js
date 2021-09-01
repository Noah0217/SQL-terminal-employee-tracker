//dependencies
const inquirer = require("inquirer")
const mysql = require("mysql2")
const CTable = require('console.table')
const chalk = require('chalk')  //https://www.npmjs.com/package/chalk
const figlet = require('figlet')  //https://www.npmjs.com/package/figlet
require("dotenv").config();  //https://www.npmjs.com/package/dotenv

//port to live server
const PORT = process.env.PORT || 3000;

//connection to database and figlet title
connection.connect((error) => {
if (error) throw error;
console.log(chalk.orange.bold('==================================================================='));
console.log('');
console.log(chalk.greenBright.bold(figlet.textSync('Employee Tracker')));
console.log(``);
    console.log(chalk.orange.bold(`===================================================================`));
    userPrompt();
});
