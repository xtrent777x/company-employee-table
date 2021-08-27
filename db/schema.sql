

CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NULL
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);