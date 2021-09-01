//dependencies
const inquirer = require("inquirer")
const mysql = require("mysql2")
const CTable = require('console.table')
const chalk = require('chalk')  //https://www.npmjs.com/package/chalk
const figlet = require('figlet')  //https://www.npmjs.com/package/figlet
require("dotenv").config();  //https://www.npmjs.com/package/dotenv
const connection = require('./config/connections');

//port to live server
const PORT = process.env.PORT || 3000;

//connection to database and figlet title
connection.connect((error) => {
if (error) throw error;
console.log(chalk.orange.bold('==================================================================='));
console.log('');
console.log(chalk.greenBright.bold(figlet.textSync('Employee Tracker')));
console.log('');
    console.log(chalk.orange.bold(`===================================================================`));
    choicesPrompt();
});

//choices prompt
const choicesPrompt = () => {
    inquirer.prompt([
        {
            type : "list",
            message: "Please select an action below",
            name: "choice",
            choices: [
                "View All Employees?", 
                "View All Employee's By Roles?",
                "View all Employees By Departments", 
                "Update Employee",
                "Add Employee?",
                "Add Role?",
                "Add Department?"
            ]
        }
    ])

    //
    .then((answers) => {
        const {choices} = answers;
  
          if (choices === 'View All Employees') {
              viewAllEmployees();
          }
  
          if (choices === 'View All Departments') {
            viewAllDepartments();
        }
  
          if (choices === 'View All Employees By Department') {
              viewEmployeesByDepartment();
          }
  
          if (choices === 'Add Employee') {
              addEmployee();
          }
  
          if (choices === 'Remove Employee') {
              removeEmployee();
          }
  
          if (choices === 'Update Employee Role') {
              updateEmployeeRole();
          }
  
          if (choices === 'Update Employee Manager') {
              updateEmployeeManager();
          }
  
          if (choices === 'View All Roles') {
              viewAllRoles();
          }
  
          if (choices === 'Add Role') {
              addRole();
          }
  
          if (choices === 'Remove Role') {
              removeRole();
          }
  
          if (choices === 'Add Department') {
              addDepartment();
          }
  
          if (choices === 'View Department Budgets') {
              viewDepartmentBudget();
          }
  
          if (choices === 'Remove Department') {
              removeDepartment();
          }
  
          if (choices === 'Exit') {
              connection.end();
          }
    });
  };