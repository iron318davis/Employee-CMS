DROP DATABASE IF EXISTS CMS;
CREATE DATABASE CMS;
USE CMS;

CREATE TABLE department (
  id int NOT NULL primary key,
  name varchar(30) NOT NULL
);

CREATE TABLE role (
  id int NOT NULL primary key,
  title varchar(30) NOT NULL,
  salary decimal,
  department_id int
);

CREATE TABLE employee (
  id int NOT NULL primary key,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int,
  manager_id int
);

-- select * from department;
-- select * from role;
-- select * from employee;

-- Department Data
insert into department (id, name)
Values (1111, "TestDeptA"), (1112, "TestDeptB"), (1113, "TestDeptC"), (1114, "TestDeptD");

-- Role Data
insert into role (id, title, salary, department_id)
values (1121, "TestRoleManager", 10000, 1211), (1131, "TestRoleA", 10001, 1311), (1141, "TestRoleB", 10002, 1411);

-- Employee Data
insert into employee (id, first_name, last_name, role_id, manager_id)
values (2111, "TestFirstNameManager", "TestLastNameManager", 1211, 999);
insert into employee (id, first_name, last_name, role_id)
values (3111, "TestFirstNameA", "TestLastNameA", 1131), (4111, "TestFirstNameB", "TestLastNamBA", 1141);
