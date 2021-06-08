Restful API

Desarrollada por Cristian Loaiza

1. Ejecutar los scripts para la creación de la base de datos:

   - `CREATE DATABASE bdb_employees;`
   - `CREATE TABLE employees (id SERIAL PRIMARY KEY, document_number INT, fullname TEXT, employee_function TEXT, boss_id INT);`
   - `ALTER TABLE employees ADD CONSTRAINT fk_employee_boss FOREIGN KEY (boss_id) REFERENCES employees (id);`
   - `INSERT INTO users ( document_number, fullname, employee_function, boss_id ) VALUES (123, 'Cristian Loaiza', 'Manager'), (456, 'Andres Arias', 'Developer', 1), (789, 'Jhon Doe', 'Designer', 1),`

2. Instalar dependencias

   - `npm install`

3. Iniciar el servidor

   - `node src/index.js`

4. API en el archivo `api-rest-example.json`
