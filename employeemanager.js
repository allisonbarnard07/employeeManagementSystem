var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runManager() {
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

                case "View All Employees By Department":
                    viewEmployeeDepts();
                    break;
                case "View All Employees By Role":
                    viewEmployeesRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "Update Employee Manager":
                    updateManager();
                    break;

            }
        });
}
