DROP DATABASE IF EXISTS employees_db;
CREATE database employees_db;

USE employees_db;

CREATE TABLE department (
    dept_id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30),
    PRIMARY KEY (dept_id)
);

CREATE TABLE employee_role (
    role_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DEC(7,2) NOT NULL,
    dept_id INT,
    PRIMARY KEY (role_id),
);

CREATE TABLE employees (
    emp_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    emp_role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (emp_id),

);