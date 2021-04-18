const msyql = require('mysql');

const connection = msyql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'gator',
    database: 'employees_db'
});

exports.viewEmployees = () => {
    const queryString = "SELECT e.emp_id, e.first_name, e.last_name, title, salary, dept_name, " +
        "e2.first_name AS manager_first_name, e2.last_name AS manager_last_name " +
        "FROM employees AS E " +
        "INNER JOIN employee_role AS C ON E.emp_role_id = c.role_id " +
        "INNER JOIN department AS D ON C.dept_id = d.dept_id " +
        "LEFT JOIN employees AS E2 ON E.manager_id = E2.emp_id;";

    connection.query(queryString, (err, res) => {
        if (err) throw err;
        console.table(res);
        app.start();
    })
}