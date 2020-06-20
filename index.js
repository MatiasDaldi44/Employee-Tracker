const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = require("./config/connection.js");

function init() {
    inquirer.prompt({
        type: "list",
        name: "mainChoice",
        message: "What would you like to do?",
        choices:
            [
                "View All Employees",
                "View Employees By Department",
                "Add A New Employee",
                "Update An Employee's Info",
                "Remove An Employee",
                "View All Roles",
                "Add A New Role",
                "Remove A Role",
                "View All Departments",
                "Add A New Department",
                "Remove A Department",
                "Quit"
            ]
    }).then((selection) => {
        switch (selection.mainChoice) {
            case "View All Employees":
                viewAllEmp();
                break;
            case "View Employees By Department":
                spaceForFunction();
                break;
            case "Add A New Employee":
                spaceForFunction();
                break;
            case "Update An Employee's Info":
                spaceForFunction();
                break;
            case "Remove An Employee":
                spaceForFunction();
                break;
            case "View All Roles":
                spaceForFunction();
                break;
            case "Add A New Role":
                spaceForFunction();
                break;
            case "Remove A Role":
                spaceForFunction();
                break;
            case "View All Departments":
                spaceForFunction();
                break;
            case "Add A New Department":
                spaceForFunction();
                break;
            case "Remove A Department":
                spaceForFunction();
                break;
            case "Quit":
                quitFunction();
                break;
        }
    })
}

function viewAllEmp() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.role_title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function quitFunction() {
    console.log("Have a Good Day")
    connection.end()
}

function spaceForFunction() {
    console.log("Working")
    init();
}

init();