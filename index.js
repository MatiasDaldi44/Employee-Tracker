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
                "Update An Employee's Role",
                "Remove An Employee",
                "View All Roles",
                "Add A New Role",
                "Remove A Role",
                "View All Departments",
                "Add A New Department",
                "Remove A Department",
                "Quit"
            ]
    }).then(selection => {
        switch (selection.mainChoice) {
            case "View All Employees":
                viewAllEmp();
                break;
            case "View Employees By Department":
                viewByDepartment();
                break;
            case "Add A New Employee":
                newEmployee();
                break;
            case "Update An Employee's Role":
                updateEmployeeRole();
                break;
            case "Remove An Employee":
                deleteEmployee();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add A New Role":
                newRole();
                break;
            case "Remove A Role":
                deleteRole();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Add A New Department":
                newDepartment();
                break;
            case "Remove A Department":
                deleteDepartment();
                break;
            case "Quit":
                quitFunction();
                break;
        };
    });
};

function viewAllEmp() {
    connection.query("SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee, role.role_title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

function viewByDepartment() {
    inquirer.prompt({
        name: "departmentChoice",
        type: "list",
        message: "Which department would you like to view the employees of?",
        choices: ["Sales", "Legal", "Security", "Finance"]
    }).then(answer => {
        connection.query(`SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee, department.name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.name ="${answer.departmentChoice}"`, (err, res) => {
            if (err) throw err;
            console.table(res);
            init();
        });
    });
};

function newEmployee() {
    connection.query("SELECT CONCAT(first_name, ' ', last_name) AS manager, id FROM employee", (err, response) => {
        connection.query('SELECT DISTINCT role_title, id FROM role', (err, res) => {
            inquirer.prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: "What is the new employee's first name?"
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: "What is the new employee's last name?"
                },
                {
                    name: 'role_title',
                    type: 'list',
                    message: "What is the new employee's role?",
                    choices: res.map(data => ({ name: data.role_title, value: data.id }))
                },
                {
                    name: 'manager',
                    type: 'list',
                    message: "Which manager will this employee be assigned to?",
                    choices: response.map(data => ({ name: data.manager, value: data.id }))
                }
            ]).then(answer => {
                connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${answer.first_name}", "${answer.last_name}", "${answer.role_title}", "${answer.manager}")`, (err, res) => {
                    if (err) throw err;
                    console.log(`${answer.first_name} ${answer.last_name} has been added to the system`)
                    init()
                });
            });
        });
    });
};

function updateEmployeeRole() {
    connection.query("SELECT CONCAT(first_name, ' ', last_name) AS employee, id FROM employee", (err, response) => {
        connection.query("SELECT role_title, id FROM role", (err, res) => {
            inquirer.prompt([
                {
                    name: 'employeeToUpdate',
                    type: 'list',
                    message: "Which employee would you like to update?",
                    choices: response.map(item => ({ name: item.employee, value: item.id }))
                },
                {
                    name: 'newRole',
                    type: 'list',
                    message: "Which role would you like to assign to the employee?",
                    choices: res.map(item => ({ name: item.role_title, value: item.id }))
                }
            ]).then(answer => {
                connection.query(`UPDATE employee SET role_id = ${answer.newRole} WHERE id = ${answer.employeeToUpdate}`, (err, res) => {
                    if (err) throw err;
                    console.log("Employee has been updated");
                    init();
                });
            });
        });
    });
};

function deleteEmployee() {
    connection.query("SELECT CONCAT (first_name, ' ', last_name) AS name, id FROM employee", (err, res) => {
        let employeeList = res.map(item => ({ name: item.name, value: item.id }));
        inquirer.prompt({
            name: "employeeToDelete",
            type: "list",
            message: "Which employee would you like to delete?",
            choices: employeeList
        }).then(answer => {
            let toDelete = employeeList.filter(item => item.value === answer.employeeToDelete);
            connection.query(`DELETE FROM employee WHERE id = ${answer.employeeToDelete}`, (err, res) => {
                if (err) throw err;
                console.log(`${toDelete[0].name} has been deleted`);
                init();
            });
        });
    });
};

function viewAllRoles() {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

function newRole() {
    connection.query("SELECT * FROM department", (err, res) => {
        inquirer.prompt([
            {
                name: 'role_title',
                type: 'input',
                message: "What will the title of the new role be?"
            },
            {
                name: 'salary',
                type: 'input',
                message: "What will this role's salary be?"
            },
            {
                name: 'assignedDepartment',
                type: 'list',
                message: "What department will this role be in?",
                choices: res.map(item => ({ name: item.name, value: item.id }))
            }
        ]).then(answer => {
            connection.query(`INSERT INTO role (role_title, salary, department_id) VALUES ("${answer.role_title}", "${answer.salary}", "${answer.assignedDepartment}")`, (err, res) => {
                if (err) throw err;
                console.log(`${answer.role_title} has been created`);
                init();
            });
        });
    });
};

function deleteRole() {
    connection.query("SELECT role_title, id FROM role", (err, res) => {
        let allRoles = res.map(item => ({ name: item.role_title, value: item.id }));
        inquirer.prompt({
            name: 'roleToDelete',
            type: 'list',
            message: "Which role would you like to delete?",
            choices: allRoles
        }).then(answer => {
            let selectedRole = allRoles.filter(item => item.value === answer.roleToDelete);
            connection.query(`DELETE FROM role WHERE id = ${answer.roleToDelete}`, (err, res) => {
                if (err) throw err;
                console.log(`${answer.roleToDelete} has been deleted`);
                init();
            });
        });
    });
};

function viewAllDepartments() {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

function newDepartment() {
    inquirer.prompt(
        {
            name: 'name',
            type: 'input',
            message: "What will the name of the new department be?"
        }
    ).then(answer => {
        connection.query(`INSERT INTO department (name) VALUES ("${answer.name}")`, (err, res) => {
            if (err) throw err;
            console.log(`${answer.name} has been created as a new department`);
            init();
        });
    });
};

function deleteDepartment() {
    connection.query("SELECT name, id FROM department", (err, res) => {
        let allDepartments = res.map(item => ({ name: item.name, value: item.id }));
        inquirer.prompt({
            name: 'departmentToDelete',
            type: 'list',
            message: "Which department would you like to delete?",
            choices: allDepartments
        }).then(answer => {
            let selecteddepartment = allDepartments.filter(item => item.value === answer.departmentToDelete);
            connection.query(`DELETE FROM department WHERE id = ${answer.departmentToDelete}`, (err, res) => {
                if (err) throw err;
                console.log(`${answer.selecteddepartment} has been deleted`);
                init();
            });
        });
    });
};

function quitFunction() {
    console.log("Have a Good Day");
    connection.end();
};

function spaceForFunction() {
    console.log("Working");
    init();
};

init();