const msyql = require('mysql');
const inquirer = require('inquirer');

const connection = msyql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'gator',
    database: 'employees_db'
});

connection.connect((err) => {
    if (err) throw err;
    runApp();
})

runApp = () => {
    inquirer
        .prompt({
            name: 'prompt',
            type: 'list',
            message: 'Hi! What do you want to do today?',
            choices: [
                'View all employees',
                'Add an employee',
                'Update an employee',
                'Exit'
            ]
        })
        .then(function (answer) {
            switch (answer.prompt) {
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add an employee':
                    console.log("add stuff", answer);
                    addEmployee();
                    break;
                case 'Update an employee':
                    console.log('update stuff', answer);
                    updateRole();
                    break;
                case 'Exit':
                    connection.end();
                    break
            }
        })
}

//Setting up the functions for viewing employees, departments

viewEmployees = () => {
    const queryString = "SELECT e.emp_id, e.first_name, e.last_name, title, salary, dept_name, " +
        "e2.first_name AS manager_first_name, e2.last_name AS manager_last_name " +
        "FROM employees AS E " +
        "INNER JOIN employee_role AS C ON E.emp_role_id = c.role_id " +
        "INNER JOIN department AS D ON C.dept_id = d.dept_id " +
        "LEFT JOIN employees AS E2 ON E.manager_id = E2.emp_id;";

    connection.query(queryString, function (err, res) {
        if (err) throw err;
        console.table(res);
        runApp();
    })
}

//Setting up ability to add employees to database

addEmployee = () => {
    inquirer
        .prompt([{
            name: "firstName",
            type: "input",
            message: "Please enter the employee's FIRST NAME"
        },
        {
            name: "lastName",
            type: "input",
            message: "Please enter the employee's LAST NAME"

        },
        {
            name: "empRoleID",
            type: "choice",
            message: "Please select the employee's role ID (1 = manager, 2 = salesfloor, or 3 = stockroom)",
            choices: [
                "1",
                "2",
                "3"
            ]
        },
        {
            name: "managerID",
            type: "input",
            message: "Please put the manager's ID number. If not the manager, put '0' as the id."
        }

        ])
        .then((answer) => {
            const queryString = "INSERT INTO employees SET ?";
            connection.query(queryString, {
                first_name: answer.firstName,
                last_name: answer.lastName, emp_role_id: answer.empRoleID, manager_id: answer.managerID
            }, function (err, res) {
                if (err) throw err;
                runApp();
            })
        })
}
//Here were updating roles!

updateRole = () => {
    inquirer
        .prompt([{
            name: "roleID",
            type: "input",
            message: "Please enter the employe ID of the employee you want to change (1 = manager, 2 = salesfloor, or 3 = stockroom) "
        },
        {
            name: "roleChange",
            type: "input",
            message: "Please enter the new role you want to change"
        }])
        .then((answer) => {
            const queryString = "UPDATE employee_role SET ? WHERE ?";
            connection.query(queryString, [{ title: answer.roleChange }, { role_id: answer.roleID }],
                function (err, res) {
                    if (err) throw err;
                })
            runApp();
        })
}
//  emp_id INT NOT NULL AUTO_INCREMENT,
//     first_name VARCHAR(30) NOT NULL,
//     last_name VARCHAR(30) NOT NULL,
//     emp_role_id INT NOT NULL,
//     manager_id INT,
//     PRIMARY KEY (emp_id),
//     FOREIGN KEY (emp_role_id) REFERENCES employee_role(role_id),
//     FOREIGN KEY (manager_id) REFERENCES employees(emp_id)