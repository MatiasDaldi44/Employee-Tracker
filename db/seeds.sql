INSERT INTO department (name) VALUES ("Sales"); 
INSERT INTO department (name) VALUES ("Legal"); 
INSERT INTO department (name) VALUES ("Security"); 
INSERT INTO department (name) VALUES ("Finance"); 

INSERT INTO role (role_title, salary, department_id) VALUES ("Head Bird Lawyer", 200000, 2); 
INSERT INTO role (role_title, salary, department_id) VALUES ("Sales Implicator", 150000, 1); 
INSERT INTO role (role_title, salary, department_id) VALUES ("Head of Security", 10000, 3); 
INSERT INTO role (role_title, salary, department_id) VALUES ("Sales Assistant", 75000, 1); 
INSERT INTO role (role_title, salary, department_id) VALUES ("Head of Finance", 400000, 4); 
INSERT INTO role (role_title, salary, department_id) VALUES ("Lead Finder", 500, 1); 
INSERT INTO role (role_title, salary, department_id) VALUES ("Accountant", 60000, 4); 
INSERT INTO role (role_title, salary, department_id) VALUES ("Legal Consultant", 100000, 2); 

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Charlie", "Kelly", 1, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dennis", "Reynolds" , 2, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Fat", "Mac", 3, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dee", "Reynolds", 4, 2); 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Frank", "Reynolds", 5, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Rickety", "Cricket", 6, 2); 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Liam", "McPoyle", 7, 5); 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Brian", "Unger", 8, 1); 