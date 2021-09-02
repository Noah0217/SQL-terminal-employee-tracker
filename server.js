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
connection.connect(function(err) {
    if (err) throw err

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
        //choices
    ]).then((answers) => {
        const {choices} = answers;
  
          if (choices === 'View All Employees') {
              viewAllEmployees();
          }
  
          if (choices === 'View All Roles') {
            viewAllRoles();
          }
  
          if (choices === 'View All Employees By Department') {
              viewEmployeesByDepartment();
          }

          if (choices === 'Update Employee Role') {
              updateEmployee();
          }
          
          if (choices === 'Add Employee') {
              addEmployee();
          }

          if (choices === 'Add Role') {
                addRole();
          }

          if (choices === 'Add Department') {
                addDepartment();
          }
    
    })
  }

  //view all employees
  function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      choicesPrompt()
  })
}

//view all roles
function viewAllRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
    })
  }

//view all employees in departments
function viewEmployeesByDepartment() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
  }

  //update employee
  function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
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
            startPrompt()
        })
  
    });
  });

  }

































//successfully connected to port
app.listen(PORT, () => 
console.log(`successfully connected to http://localhost:${PORT}`)); 
  