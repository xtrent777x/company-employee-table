

INSERT INTO departments (name) 
VALUES 
('Sales'),
('Collections'),
('legal'),
('Engineering'),
('HR');


INSERT INTO role (title, salary, department_id) 
VALUES 
('Sales lead', 95000.00, 1),
('sales rep', 85000.00, 1),
('Team lead', 55000.00, 2),
('collection rep', 45000.00, 2),
('Attorney', 135000.00, 3),
('paralegal', 75000.00, 3),
('Lead Engineer', 120000.00, 4),
('Engineer', 80000.00, 4),
("Trainer", 70000.00, 5),
("Accountant", 60000.00, 5);


INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id) 
VALUES
('Tim', 'Tebow', 1, NULL, 1),
('Zach', 'Wilson', 2, 1, 1),
('Ty', 'Detmer', 3, NULL, 2),
('Pam', 'Beasley', 4, 3, 2),
('Micheal', 'Scott', 5, NULL, 3),
('Wendy', 'Anderson', 6, 5, 3),
('Dwight', 'Schrutt', 7, NULL, 4),
('Mickey', 'Mouse', 8, 7, 4),
('Donald', 'Duck', 9, NULL, 5),
('Deborah', 'Samulason', 10, 9, 5);
