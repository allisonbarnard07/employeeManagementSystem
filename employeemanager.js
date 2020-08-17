var mysql = require("mysql");
var inquirer = require("inquirer");
const table = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Razz-@-Taz1995!",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View Departments",
            "View Roles",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Update Employee Role"
        ]
    })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    viewEmployees();
                    break;

                case "View Departments":
                    viewEmployeeDepts();
                    break;
                case "View Roles":
                    viewEmployeesRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Role":
                    addRole();
                    break;
                    case "Add Department":
                        addDepartment();
                        break;
                case "Update Employee Role":
                    updateRole();
                    break;
                    case 'Exit':
                        connection.end();
                        break;

            }
        });
    }

    function viewEmployees(){
var query = `SELECT * FROM employee`;
connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
    }

    function viewEmployeesRole(){
        var query = `SELECT * from role`;
connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
    }

    function viewEmployeeDepts(){
        var query = `SELECT * from department`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            runSearch();
          });
            }

    function addEmployee(){
        inquirer.prompt([
            {
                type: 'input',
                message: "Enter employee's first name",
                name: "firstname",
            },
            {
                type: "input",
                message: "Enter employee's last name",
                name: "lastname",
            },
            {
              name: 'roleid',
              type: 'list',
              message: "Slect employee's role id",
              choices: ['1', '2'],
            },
            {
              name: 'managerid',
              type: 'list',
              message: "Select employee's manager id",
              choices: ['1', '2'],
            },
        ])
        .then(function(answer) {
          query = `INSERT INTO employee SET ?`;
            connection.query(
              query,
              {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: answer.roleid,
                manager_id: answer.managerid,
              },
              (err) => {
                if (err) throw err;
                console.log('Employee has been added');
                runSearch();
              }
            );
          });
      }

      function addRole(){
        inquirer.prompt([
            {
                type: 'input',
                message: "Add name of role",
                name: 'title'
            },
            {
                type: "input",
                message: "Add salary of role",
                name: "salary"
            },
            {
                type: "list",
                message: "Add the department ID",
                name: "department_id",
                choices: ['1', '2']
            }
        ])
        .then(function(answer) {
          query = `INSERT INTO role SET ?`;
          connection.query(
            query,
              {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
              },
              (err) => {
                if (err) throw err;
                console.log('New role has been added.');
                runSearch();
              }
            );
          });
      }

      function addDepartment(){
        inquirer.prompt([
            {
                type: 'input',
                message: "Enter name of department.",
                name: 'dept_name'
            },
        ])
        .then(function(answer) {
          query = `INSERT INTO department SET ?`;
          connection.query(
            query,
            {
              dept_name: answer.dept_name,
            },(err) => {
             if (err) throw err;
             console.log('Added new department!');
             runSearch();
           }
         );
       });
   }

      function updateRole() {
        var allEmployees = [];
        connection.query("SELECT * FROM employee", function(err, answer) {

          for (let i = 0; i < answer.length; i++) {
            let employeeString =
              answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
            allEmployees.push(employeeString);
          }
      
          inquirer
            .prompt([
              {
                type: "list",
                name: "updateRole",
                message: "Select an employee to their role",
                choices: allEmployees
              },
              {
                type: "list",
                message: "Select a new role",
                choices: ["manager", "employee"],
                name: "newRole"
              }
            ])
            .then(function(answer) {
              console.log("Updating", answer);
              const idUpdate = {};
              idUpdate.id = parseInt(answer.updateRole.split(" ")[0]);
              if (answer.newrole === "manager") {
                idUpdate.role_id = 1;
              } else if (answer.newrole === "employee") {
                idUpdate.role_id = 2;
              }
              connection.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [idUpdate.role_id, idUpdate.id],
                  runSearch()
              );
            });
        });
      }
      

