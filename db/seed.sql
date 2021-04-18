INSERT INTO department (dept_name) VALUES ('Management'), ('Salesfloor'), ('StockRoom');

INSERT INTO employee_role (title, salary, dept_id) VALUES

('Floor Manager', 5000, 1),
('Sales Associate', 1000, 2),
('Stock Manager', 5000, 1),
('Stock Associate', 1000, 3),
('Custodial', 1000, 2),
('General Manager', 6000, 1),
('Cashier', 1000, 2),
('Night Stock Associate', 1000, 3)

INSERT INTO employees (first_name, last_name, emp_role_id, manager_id) VALUES

('Bruce', 'Wanye', 1, 1),
('Matt', 'Murdock', 1, 2),
('God', 'Zilla', 3, NULL),
('Napoleon', 'Dynamite', 2, NULL),
('Bad', 'Bunny', 2, NULL),
('Kanye', 'West', 3, NULL),
('Jay', 'Z', 2, NULL);