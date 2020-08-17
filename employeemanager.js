var mysql = require("mysql");
var inquirer = require("inquirer");

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
            "View All Employees By Department",
            "View All Employees By Role",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager"
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
var query = `SELECT * from employee`;
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
                name: 'first_name'
            },
            {
                type: "input",
                message: "Enter employee's last name",
                name: "last_name"
            }
        ])
        .then(function(answer) {
            connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: answer.firstname,
                last_name: answer.lastname,
              },
              function(err, answer) {
                if (err) {
                  throw err;
                }
                console.table(answer);
              }
            );
            runSearch();
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
                {
                  runSearch();
                }
              );
            });
        });
      }
      