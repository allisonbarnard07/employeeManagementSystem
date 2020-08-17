DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
dept_name varchar(30) NOT NULL
);

CREATE TABLE role (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
title VARCHAR(30) NOT NULL,
salary decimal(8, 2) NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT, 
FOREIGN KEY(role_id) REFERENCES role(id),
FOREIGN KEY(manager_id) REFERENCES employee(id)
);

SELECT * from department;

INSERT INTO department
    (dept_name)
VALUES
    ('Manager'),
    ('Employee');
    
    INSERT INTO role
    (title, salary, department_id)
VALUES
	('Manager', 120000, 1),
	('Employee', 50000, 2);


INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
('Taz', 'Barnard', 1, 1),
('Brit', 'Grin', 1, 1),
('King', 'Steven', 2, 2),
('Emmitt', 'Smith', 2, 2);

select * from department;
select * from role; 
select * from employee; 

<<<<<<< HEAD


=======
>>>>>>> b73e30929235e91fae6678b2a9e70d7ad9afacc0
