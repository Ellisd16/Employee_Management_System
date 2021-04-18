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
        .then((answer) => {
            switch (answer.action) {
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee':
                    updateEmployee();
                    break;
                case 'Exit':
                    connection.end();
                    return
            }
        })
}