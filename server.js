//dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const chalk = require('chalk');  //https://www.npmjs.com/package/chalk
const figlet = require('figlet');  //https://www.npmjs.com/package/figlet
require("dotenv").config();  //https://www.npmjs.com/package/dotenv
//const connection = require('./config/connection');

//connection to database
const connection = mysql.createConnection({  ////https://www.tabnine.com/code/javascript/functions/mysql/createConnection
    host: "localhost",
    port: 3306,
    user: 'root',
    password: process.env.DB_PASS,
    database: "employee_tracker"
},
console.log('Successfully connected to Employee_tracker database')
);

//figlet title
connection.connect(function(err) {
    if (err) throw err

    //figlet title 
    console.log(chalk.magentaBright.bold(`====================================================================================`));
    console.log('');
    console.log(chalk.blue.bold(figlet.textSync('Employee Tracker')));
    console.log('');
    console.log(chalk.magentaBright.bold(`====================================================================================`));
    choicesPrompt();
});

//choices prompt
const choicesPrompt = () => {
    inquirer.prompt([
        {
            type : "list",
            message: "Please select an action below",
            name: "choices",
            choices: [
                "View All Employees?", 
                "View All Employee's By Roles?",
                "View all Employees By Departments?", 
                "Update Employee?",
                "Add Employee?",
                "Add Role?",
                "Add Department?"
            ]
        }
    ])
    
// choices to match prompt
    .then((answers) => {
        const {choices} = answers;
  
          if (choices === 'View All Employees?') {
              viewAllEmployees();
          }
  
          if (choices === 'View All Roles?') {
              viewAllRoles();
          }
  
          if (choices === 'View All Employees By Department?') {
              viewEmployeesByDepartment();
          }

          if (choices === 'Update Employee Role?') {
              updateEmployee();
          }
          
          if (choices === 'Add Employee?') {
              addEmployee();
          }

          if (choices === 'Add Role?') {
              addRole();
          }

          if (choices === 'Add Department?') {
              addDepartment();
          }
    
    })
  }

  //view all employees
  function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, results) {
      if (err) throw err
      console.table(results);
      choicesPrompt()
  })
}

//view all employees by roles
function viewAllRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, results) {
    if (err) throw err
    console.table(results);
    choicesPrompt()
    })
  }

//view all employees by departments
function viewEmployeesByDepartment() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, results) {
      if (err) throw err
      console.table(results);
      choicesPrompt()
    })
  }

  //update employee
  function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
     if (err) throw err
     console.log(results)
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < results.length; i++) {
                lastName.push(results[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name?",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole()
          },
      ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        connection.query("UPDATE employee SET WHERE ?", 
        {
          last_name: val.lastName
           
        }, 

        {
          role_id: roleId
           
        }, 

        function(err){
            if (err) throw err
            console.table(val)
            choicesPrompt()
        })
  
    });
  });

  }

  //add employee
  function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(val)
          choicesPrompt()
      })

  })
}
