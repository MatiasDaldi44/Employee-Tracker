DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department(
    id INT UNIQUE AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT UNIQUE AUTO_INCREMENT, 
    role_title VARCHAR(50) NOT NULL,
    salary INT NOT NULL,
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT UNIQUE AUTO_INCREMENT, 
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);