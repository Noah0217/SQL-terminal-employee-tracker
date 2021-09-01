--seeds department
INSERT INTO department (name)
VALUE ("Sales");

INSERT INTO department (name)
VALUE ("Finance");

INSERT INTO department (name)
VALUE ("Marketing");

INSERT INTO department (name)
VALUE ("Engineering");

INSERT INTO department (name)
VALUE ("Legal");

--seeds role
INSERT INTO role(title, salary, department_id)
VALUES("Engineer", 85000, 1);

INSERT INTO role(title, salary, department_id)
VALUES("Senior Engineer", 125000, 1);

INSERT INTO role(title, salary, department_id)
VALUES("CFO", 350000, 3);

INSERT INTO role(title, salary, department_id)
VALUES("Chief Counsel", 300000, 4);

--seeds employee
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Johnnie', 'Random', 1, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('James', 'Smith', 1, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Ronnie', 'Manning', 1, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Jimmy', 'Jones', 2, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Larry', 'Legal', 4, null);