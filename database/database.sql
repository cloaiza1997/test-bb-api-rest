CREATE DATABASE bdb_employees;
CREATE TABLE employees(
  id SERIAL PRIMARY KEY,
  document_number INT,
  fullname TEXT,
  employee_function TEXT,
  boss_id INT
);
ALTER TABLE employees
ADD CONSTRAINT fk_employee_boss FOREIGN KEY (boss_id) REFERENCES employees (id);
INSERT INTO users (
    document_number,
    fullname,
    employee_function,
    boss_id
  )
VALUES (123, 'Cristian Loaiza', 'Manager'),
  (456, 'Andres Arias', 'Developer', 1),
  (789, 'Jhon Doe', 'Designer', 1),